var app = angular.module('knowitdevsummit');

app.service('authService', ['$http', '$q', function($http, $q) {
  var user = null;

  return {
    getUser: function() {
      return $http.get('/api/auth/me');
    },
    isSignedIn: function() {
      return true && this.getUser(); // Cast user to boolean
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
