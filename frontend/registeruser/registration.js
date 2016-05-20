var app = angular.module('knowitdevsummit');

app.directive('registeruser', ['$http', function($http) {

  return {
    templateUrl: 'registeruser/registeruser.html',
    link: function(scope) {
      scope.form = [
        {
          label: "First name",
          id: "firstname"
        },
        {
          label: "Last name",
          id: "lastname"
        },
        {
          label: "Email",
          id: "email"
        },
        {
          label: "Phone number",
          id: "phone"
        },
        {
          label: "Knowit company",
          id: "company"
        },
        {
          label: "Invoice identifier",
          id: "invoice"
        },
        {
          label:"Food allergies or requirements",
          id: "foodreqs"
        }
      ];

      scope.roles =
        {
          "Developer": false,
          "Tester/test lead": false,
          "Project manager": false,
          "Architect": false,
          "UX specialist": false,
          "Security professional": false,
          "Product developer": false,
          "Manager": false,
          "Scrum master": false,
          "Agile coach": false,
          "Designer": false,
          "Other": false
        };
      scope.gender = [
        'male',
        'female',
        'other'
      ];

      scope.user = {};
    }
  }
}]);
