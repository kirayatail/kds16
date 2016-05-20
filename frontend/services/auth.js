var app = angular.module('knowitdevsummit');

app.service('authService', ['$http', '$q', function($http, $q) {
  var user = null;

  return {
    getUser: function() {
      var def = $q.defer();

      if(user){
        def.resolve(user);
      }
      $http.get('/api/auth/me').then(function(r) {
        user = r.data;
        def.resolve(user);
      }, function(err) {
        def.reject(err);
      });

      return def.promise;
    },
    signinEmail: function(email) {
      return $http.post('/api/auth/email/request', {"email": email });
    },
    logout: function() {
      user = null;
      return $http.get('/api/auth/signout');
    }
  };
}]);
