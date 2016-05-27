'use strict';

var app = angular.module('knowitdevsummit', [
  'ngRoute',
  'ui.tinymce',
  'AxelSoft'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'pages/start/start.html',
    controller: 'StartController'
  }).
  when('/talks', {
    templateUrl: 'pages/talks/talks.html',
    controller: 'TalksController'
  }).

  otherwise({
    redirectTo: '/'
  });

}]);
