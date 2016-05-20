var app = angular.module('knowitdevsummit');

app.directive('createProposal', ['$http', function($http){
  return {
    templateUrl:'createproposal/createproposal.html',
    link: function(scope) {
      scope.showForm = false;
      scope.wait = false;

      scope.tinymceOptions = {
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
      };

      scope.proposal = {
        duration: "10",
        language: "eng"
      };

      scope.submit = function() {
        scope.wait = true;
        $http.post('/api/talks', scope.proposal).then(function(res) {
          swal({
            type: "success",
            title: "Submitted!",
            text: "Your proposal has been submitted and will be reviewed shortly."
          });

          scope.proposal = {
            duration: "10",
            language: "eng"
          };
          scope.wait = false;
        }, function(err) {
          errText = "Something went wrong, Check the input fields and try again.\n If the problem persists please contact the administrator.";
          if(err.code === 401 || err.code === 403) {
            errText = "You must sign in before you can submit a proposal";
          }
          swal({
            type:"error",
            title:"Not submitted!",
            text:errText
          });
          scope.wait = false;
        });
      }
    }
  }
}]);
