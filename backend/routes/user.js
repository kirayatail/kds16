var userCtrl = require('../controllers/user.js');
var authorize = require('../controllers/auth.js').Authorize;
module.exports = function(app) {

  app.post('/api/users', userCtrl.Create);
  app.get('/api/users', authorize({admin:true}), userCtrl.List);
  app.put('/api/users/:uid', authorize(), userCtrl.Update);
};
