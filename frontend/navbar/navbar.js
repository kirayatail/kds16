var app = angular.module('knowitdevsummit');

app.directive('navBar', ['authService', function(Auth) {
  return {
    templateUrl: 'navbar/navbar.html',
    scope: {},
    link: function(scope) {
      scope.data = {
        email: ''
      };
      scope.signIn = function() {
        console.log("email:", scope.data.email);
        Auth.signinEmail(scope.data.email);
      }
      scope.isSignedIn = Auth.isSignedIn();
    }
  }
}]);
