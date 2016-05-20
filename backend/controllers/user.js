var mongoose = require('mongoose');
var authCtrl = require('./auth.js');
var Users = mongoose.model('Users');

module.exports = {
  Create: function(req, res) {
    var userData = req.body;

    delete userData.admin;
    delete userData.signinToken;
    delete userData.signinTokenExpire;

    Users.create(userData, function(err, user) {
      if(err) {
        console.log(err);
        return res.status(400).json({message: err.message});
      }

      return authCtrl.RequestEmail(req, res);
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
