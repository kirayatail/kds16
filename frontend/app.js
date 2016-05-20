'use strict';

var app = angular.module('knowitdevsummit', [
  'ngRoute',
  'ui.tinymce'
]);

app.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   when('/', {
      templateUrl: 'start/start.html',
      controller: 'StartController'
   }).
  //  when('/confirm/:token', {
  //     templateUrl: 'partials/confirm.html',
  //     controller: 'ConfirmController'
  //  }).

   otherwise({
      redirectTo: '/'
   });

}]);
