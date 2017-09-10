angular.
  module('sample').
  component('logIn', {
    templateUrl: './component/login/login.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'userService', 'masterService',
      function loginController($scope, $timeout, $rootScope, $location, sessionService, userService, masterService) {

        $rootScope.logOut = function () {
          for (var prop in $rootScope) {
            if (prop.substring(0, 1) !== '$') {
              delete $rootScope[prop];
            }
          }
          sessionService.clearUserSession();
          $location.path('/');
        }

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
