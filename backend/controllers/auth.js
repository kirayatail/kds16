const User = require('mongoose').model('Users'),
    crypto = require('crypto'),
    _ = require('lodash'),
    mail = require('../lib/mail'),
    // oauth = require('./oauth'),
    passport = require('passport');

var requestEmail = function(req, res) {
  if(req.body && req.body.email) {
    var user;
    User.findOne({'email': req.body.email}, function(err, u) {
      if(err) {
        console.error("auth/email/request | Database error:", err);
        return res.status(500).send();
      }
      if(!u) {
        user = new User({"email": req.body.email});
      } else {
        user = u;
      }

      user.signinTokenExpire = Date.now() + 24*3600*1000;

      crypto.randomBytes(24, (ex, buf) => {
        user.signinToken = buf.toString('hex');
        const signinUrl = req.protocol + '://' + req.hostname + ':3000/api/auth/email/signin/' + user.signinToken;
        user.save((err) => {
          if (!err) {
            mail.sendSigninMail(user);
            return res.status(200).json({message:'signin request created', exists: true});
          }
        });
      });

    });
  } else {
    return res.status(400).send("Missing 'email' parameter");
  }
}

var getMe = function(req, res) {
  if(!req.isAuthenticated()) {
    return res.status(401).send("Not authenticated");
  }
  if(req.user) {
    delete req.user.signinToken;
    delete req.user.signinTokenExpire;

    return res.json(req.user);
  }
  return res.status(404).send();
}

var signinEmail = function(req, res, next) {
  passport.authenticate('email', function(err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      req.login(user, function (err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.redirect('/');
        }
      });
    }
  })(req, res, next);
}

var signout = function(req, res) {
  req.logout();
  res.redirect('/');
}

var authorize = function(options) {
  return function(req, res, next) {

    if(!req.user) {
      return res.status(401).json({message: "Please log in"});
    }

    if(options && options.admin && !req.user.admin) {
      return res.status(403).json({message: "Restricted to admin"});
    }

    next();
  }
}

module.exports = _.assignIn(
  {
    RequestEmail: requestEmail,
    SigninEmail: signinEmail,
    Signout: signout,
    Me: getMe,
    Authorize: authorize
  },
  {} // no oauth yet
);
