var express = require('express');
var authCtrl = require('../controllers/auth');

module.exports = function(app) {
  var general = express.Router();
  var email = express.Router();

  app.use('/api/auth', general);
    general.use('/email', email);

  general.route('/me').get(authCtrl.Me);
  general.route('/signout').get(authCtrl.Signout);

    email.route('/request').post(authCtrl.RequestEmail);
    email.route('/signin/:token').get(authCtrl.SigninEmail);

};
