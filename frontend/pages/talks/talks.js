app.controller('TalksController', ['$scope', '$http', 'authService', function($scope, $http, Auth) {
  $scope.isSignedIn = false;
  $scope.talks = {};

  $http.get('/api/talks').then(function(res) {
    $scope.talks = res.data;
  })

  Auth.getUser().then(function(res) {
    $scope.isSignedIn = res._id ? true : false;
  }, function(err) {
    $scope.isSignedIn = false;
  });

}]);
