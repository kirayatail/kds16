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
        $http.post('/api/users', scope.user).then(function(res) {
          swal({
            type: "success",
            title: "Registered",
            text: "Successfully registered with email address "+scope.user.email+".\n Please check your email and click the link to confirm"
          });
          scope.user = {};
          scope.wait = false;
        }, function(err) {
          swal({
            type:"error",
            title:"Not registered!",
            text:"Something went wrong, Check the input fields and try again.\n If the problem persists please contact the administrator."
          });
          scope.wait = false;
        });
      }
    }
  }
}]);
