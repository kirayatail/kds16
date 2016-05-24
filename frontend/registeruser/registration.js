var app = angular.module('knowitdevsummit');

app.directive('registeruser', ['$http', function($http) {

  return {
    templateUrl: 'registeruser/registeruser.html',
    link: function(scope) {
      scope.companyNames = ['C/Vision AS','Dataess AS','Jaybis Konsult AB','Knowit A/S','Knowit AB',
        'Knowit AS','Knowit Amende AS','Knowit Architecture AB','Knowit Bconnected AB',
        'Knowit Business Consulting AB','Knowit Business Growth AB','Knowit Colours',
        'Knowit Core Skåne AB','Knowit Core Syd AB','Knowit Dalarna AB','Knowit Dataunit AB',
        'Knowit Decision A/S','Knowit Decision AB','Knowit Decision Göteborg AB',
        'Knowit Decision Helikopter AB','Knowit Decision Linköping AB','Knowit Decision O2 AS',
        'Knowit Decision Oslo AS','Knowit Decision Stockholm AB','Knowit Defence Technology AB',
        'Knowit Development AB','Knowit Digital Communication Gbg AB','Knowit Digital Solutions Syd AB',
        'Knowit Energy Management AB','Knowit Estonia OÜ','Knowit Experience Bergen AS',
        'Knowit Experience Linköping AB','Knowit Experience Stockholm AB','Knowit Experience Sverige AB',
        'Knowit Experiens Oslo AS','Knowit Gävleborg AB','Knowit Göteborg Group AB',
        'Knowit HRM AB','Knowit IT Management AB','Knowit IT Strategy AB','Knowit Infra Syd AB',
        'Knowit Infrastructure Göteborg AB','Knowit Jönköping AB','Knowit Karlstad AB',
        'Knowit Management Group AB','Knowit Management Linköping AB','Knowit Mobile Syd AB',
        'Knowit Mälardalen AB','Knowit Neolab AS','Knowit Neolab Bergen AS','Knowit Neolab Group AS',
        'Knowit Neolab Metronet','Knowit Net Result AB','Knowit Net Result International AB',
        'Knowit Net Result Solutions AB','Knowit Norrland AB','Knowit Objectnet AS',
        'Knowit Oy','Knowit Performance Bergen AS','Knowit Performence Oslo AS',
        'Knowit Project Management AB','Knowit Quality Management AS','Knowit Quality Management Oslo AS',
        'Knowit Quality Services Syd AB','Knowit Reaktor AS','Knowit Reaktor Bergen AS',
        'Knowit Reaktor Emerge AS','Knowit Reaktor Kyber AS','Knowit Reaktor Magma AS',
        'Knowit Reaktor Oslo AS','Knowit Reaktor Solutions  AS','Knowit Secure AB',
        'Knowit Secure AS','Knowit Skåne AB','Knowit Solutions Sverige AB','Knowit Stavanger AS',
        'Knowit Stockholm Group AB','Knowit Syd Group AB','Knowit Systems Development Göteborg AB',
        'Knowit Sør AS','Knowit TM Veteran AB','Knowit Technology Managament i Göteborg AB',
        'Knowit Technology Management i Stockholm AB','Knowit Test Solutions AB',
        'Knowit Transformation Management AB','Knowit Uppsala AB','Knowit eCommerce AB',
        'Knowit Örebro AB'];

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
          label: "Country",
          id:"country"
        },
        {
          label: "City",
          id:"city"
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
