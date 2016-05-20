var app = angular.module('knowitdevsummit');

app.directive('registeruser', ['$http', function($http) {

  return {
    templateUrl: 'registeruser/registeruser.html',
    link: function(scope) {
      scope.wait = false;
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

      scope.submit = function() {
        scope.wait = true;
        scope.user.roles = _.filter(
          _.map(scope.roles,
            function(v,k) {
              if(v) return k;
            }),
          function(o) {
            return o !== undefined;
          });
        console.log("Submitting user:", scope.user);
        $http.post('/api/users', scope.user).then(function(res) {
          swal({
            type: "success",
            title: "Registered",
            text: "Successfully registered with email address "+scope.user.email
          });
          scope.user = {};
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
            scope.wait = false;
        }, function(err) {
          swal({
            type:"error",
            title:"Not registered!",
            text:"Something went wrong, Check the input fields and try again.\n If the problem persists please contact the administrator."
          });
          scope.wait = false;
        });
      }
    }
  }
}]);
