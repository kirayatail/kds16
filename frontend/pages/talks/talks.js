app.controller('TalksController', ['$scope', 'authService', function($scope, Auth) {
  $scope.isSignedIn = false;

  Auth.getUser().then(function(res) {
    $scope.isSignedIn = res._id ? true : false;
  }, function(err) {
    $scope.isSignedIn = false;
  });
  
}]);
