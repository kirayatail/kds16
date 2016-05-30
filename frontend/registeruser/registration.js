var app = angular.module('knowitdevsummit');

app.directive('registeruser', ['$http', function($http) {

  return {
    templateUrl: 'registeruser/registeruser.html',
    link: function(scope) {


      scope.wait = false;

      scope.user = {};
      scope.proposal = {};

      scope.showProposal = true;
      scope.showRegistration = false;

      scope.submit = function() {
        scope.wait = true;

        console.log("Submitting user:", scope.user);
        $http.post('/api/auth/email/request', {email: scope.user.email}).then(function(res) {
          swal({
            type: "success",
            title: "Done!",
            text: "Successfully signed in with email address "+scope.user.email+".\n Please check your email and click the link to confirm"
          });
          scope.user = {};
          scope.wait = false;
        }, function(err) {
          swal({
            type:"error",
            title:"Error!",
            text:"Could not send sign in request.\n If the problem persists please contact the administrator."
          });
          scope.wait = false;
        });
      }
    }
  }
}]);
