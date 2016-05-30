var app = angular.module('knowitdevsummit');

app.service('authService', ['$http', '$q', '$location', function($http, $q, $location) {
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
    update: function(u) {
      var def = $q.defer();
      $http.put('/api/users/'+u._id, u).then(
        function(succ) {
          user = succ.data;
          def.resolve(user);
        },
        function(err) {
          def.reject(err);
        }
      );
      return def.promise;
    },
    signout: function() {
      user = null;
      $location.url('/api/auth/signout');
    }
  };
}]);
