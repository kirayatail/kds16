var talkCtrl = require('../controllers/talk');
var authorize = require('../controllers/auth').Authorize;

module.exports = function(app) {
  app.route('/api/talks')
    .post(authorize(), talkCtrl.Create)
    .get(talkCtrl.List);

  app.route('/api/talks/:tid')
    .put(authorize(), talkCtrl.Update);
}
