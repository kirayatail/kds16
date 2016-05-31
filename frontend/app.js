'use strict';

var app = angular.module('knowitdevsummit', [
  'ngRoute',
  'ngSanitize',
  'ui.tinymce',
  'AxelSoft'
]);

app.config(['$routeProvider', 'authServiceProvider', function($routeProvider, authService) {
  $routeProvider.
  when('/', {
    templateUrl: 'pages/start/start.html',
    controller: 'StartController'
  }).
  when('/profile', {
    templateUrl: 'pages/profile/profile.html',
    controller: 'ProfileController',
    resolve: {
      user: function(authService) {
        return authService.getUser();
      }
    }
  }).
  when('/talks', {
    templateUrl: 'pages/talks/talks.html',
    controller: 'TalksController'
  }).

  otherwise({
    redirectTo: '/'
  });

}]);
