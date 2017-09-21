angular.
  module('sample').
  component('logIn', {
    templateUrl: './component/login/login.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'masterService', 'base64Service', 'loginService',
      function loginController($scope, $timeout, $rootScope, $location, sessionService, masterService, base64Service, loginService) {

        if (sessionService.getLoggedInUserData()) {
          $location.path('/checkin');
        }
        
        $scope.credential = {};

        $scope.doLogin = function () {
          $("#loginComponent").addClass("disabledDiv");
          document.getElementById("loadingIndicator").style.display = 'block';

          loginService.authenticate($scope.credential, data => {
            sessionService.setXAuthHeader(base64Service.encode($scope.credential.userName + ":" + $scope.credential.password));
            sessionService.setLoggedInUserData(data);
            $rootScope.loggedInUser = data;
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
