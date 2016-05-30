var mongoose = require('mongoose');
var _ = require('lodash');
var authCtrl = require('./auth.js');
var Users = mongoose.model('Users');
var Talk = mongoose.model('Talks');

module.exports = {
  Update: function(req,res) {
    var userData = req.body;
    console.log("Running update with id: "+req.params.uid+"\n"+
    "User object ID: "+ userData._id+"\n"+
    "Signed in user ID: "+ req.user._id);
    console.log(typeof userData._id);
    console.log(typeof req.user._id);

    if(userData._id !== req.user._id.toString()) {
      return res.status(403).json({message: 'Modifying another user not allowed'});
    }

    delete userData.admin;
    delete userData.signinToken;
    delete userData.signinTokenExpire;
    delete userData.email;
    delete userData._v;
    delete userData._id;

    Users.update({_id: req.user._id}, {$set: userData}, function(err, user) {
      delete user.signinToken;
      delete user.signinTokenExpire;
      return res.json(user);
    });
  },

  List: function(req, res) {
    var projection =  {
      signinToken: false,
      signinTokenExpire: false
    };

    Users.find({}, projection, function(err, users) {
      return res.json(users);
    })
  }
}
