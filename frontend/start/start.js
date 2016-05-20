var app = angular.module('knowitdevsummit');

app.controller('StartController', ['$scope', 'authService', function($scope, Auth) {
  $scope.isSignedIn = false;

  Auth.getUser().then(function(res) {
    $scope.isSignedIn = res.data._id ? true : false;
  }, function(err) {
    $scope.isSignedIn = false;
  });
}]);
