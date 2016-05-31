var app = angular.module('knowitdevsummit');

app.directive('talklist', function() {
  return {
    templateUrl: 'talklist/talklist.html',
    scope: {
      talks: '='
    },
    link: function(scope) {
      scope.categories = {
        approved: "Approved talks",
        my: "My proposals"
      };
    }
  }
})
