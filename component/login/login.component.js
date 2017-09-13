angular.
  module('sample').
  component('logIn', {
    templateUrl: './component/login/login.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'customerService', 'masterService',
      function loginController($scope, $timeout, $rootScope, $location, sessionService, customerService, masterService) {

        $scope.doLogin = function () {
          $("#loginComponent").addClass("disabledDiv");
          document.getElementById("loadingIndicator").style.display = 'block';

          masterService.getMasterData(function (data) {
            sessionService.setMasterData(data.masterData);
            $location.path('/checkin');
          });
        }
      }
    ]
  });
