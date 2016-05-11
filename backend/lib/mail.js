var config = require('../config/config');
var Mailgun = require('mailgun');
var mg = new Mailgun(config.mailgun_key);
