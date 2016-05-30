var app = angular.module('knowitdevsummit');

app.controller('StartController', ['$scope', '$location', 'authService', function($scope, $location, Auth) {
  $scope.isSignedIn = false;

  Auth.getUser().then(function(res) {
    $scope.isSignedIn = res._id ? true : false;
  }, function(err) {
    $scope.isSignedIn = false;
  });

  $scope.goto = function(path) {
    $location.url(path)
  };
  
}]);
