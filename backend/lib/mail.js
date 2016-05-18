var config = require('../config/config');
var postmark = require('postmark')(config.mail.token);

var send = function(to, subject, content) {
  return new Promise(function(resolve, reject) {
    postmark.send({
      "From": config.mail.sender,
      "To": to,
      "Subject": subject,
      "HtmlBody": content
    }, function(err, success) {
      if(err) {
        console.error("Postmark error: ", err.message);
        reject(err.message);
      } else {
        console.log("Email sent: ", subject, ' - ', to);
        resolve(success.message);
      }
    });
  });
}


var sendSigninMail = function(user) {
  var message = `Logga in på Knowit Developer Summit 2016 genom att klicka på länken:
  <br /><br /><a href="${config.url}/api/auth/email/signin/${user.signinToken}">${config.url}</a>`;

  return send(user.email, "Logga in - Knowit Developer Summit 2016", message);
}
