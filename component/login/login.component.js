angular.
  module('sample').
  component('logIn', {
    templateUrl: './component/login/login.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'masterService', 'base64Service', 'loginService',
      function loginController($scope, $timeout, $rootScope, $location, sessionService, masterService, base64Service, loginService) {

        $scope.credential = {};

        $scope.doLogin = function () {
          $("#loginComponent").addClass("disabledDiv");
          document.getElementById("loadingIndicator").style.display = 'block';

          loginService.authenticate($scope.credential, data => {
            sessionService.setXAuthHeader(base64Service.encode($scope.credential.username + ":" + $scope.credential.password));
            sessionService.setLoggedInUserData(data);

            masterService.getMasterData(function (data) {
              sessionService.setMasterData(data.masterData);
              $location.path('/checkin');
            });

          }, errData => {
            $("#loginComponent").removeClass("disabledDiv");
            document.getElementById("loadingIndicator").style.display = 'none';
            $scope.isLoginError = true;
          })

        }
      }
    ]
  });
