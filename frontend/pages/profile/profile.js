var app = angular.module('knowitdevsummit');

app.controller('ProfileController', ['$scope', '$location', 'user', 'authService', function($scope, $location, user, authService) {
  $scope.user = user;
  $scope.sending = false;

  $scope.signout = function() {
    authService.signout();
  }

  $scope.submit = function() {
    $scope.sending = true;
    console.log("Saving user:", user);
    authService.update(user).then(
      function(res) {
        $scope.sending = false;
        swal({
          type: "success",
          title: "Saved",
          text: "Successfully saved your attendance information"
        });
      },
      function(err) {
        $scope.sending = false;
        swal({
          type:"error",
          title:"Not saved!",
          text:"Something went wrong. Try again or contact administrator. \n "+err.code+": "+err.message
        });
      }
    );
  };
}]);
