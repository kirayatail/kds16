var express     = require('express'),
    bodyParser  = require('body-parser'),
    helmet      = require('helmet'),
    fs          = require('fs'),
    mongoose    = require('mongoose'),
    config      = require('./config');

// Load model schemata
var modelDir = './backend/models';

fs.readdirSync(modelDir).forEach((modelPath) => {
  console.log(modelDir + '/' + modelPath);
  require('../models/' + modelPath);
});

module.exports = function(app) {
  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  // app.use(methodOverride());

  // Use helmet to secure Express headers
  // app.use(helmet.xframe()); deprecated?
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.disable('x-powered-by');

  var db = mongoose.connect(config.db);
  mongoose.Promise = Promise;

  require('./session')(app, db);
  require('./passport')(app, db);

  require('../routes')(app);
  return app;
}
