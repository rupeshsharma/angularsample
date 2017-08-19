angular.
  module('sample').
  component('logIn', {
    templateUrl: './component/login/login.template.html',
    controller: ['$scope', '$rootScope', '$location', 'sessionService', 'userService',
      function loginController($scope, $rootScope, $location, sessionService, userService) {

        $rootScope.logOut = function () {
          for (var prop in $rootScope) {
            if (prop.substring(0, 1) !== '$') {
              delete $rootScope[prop];
            }
          }
          $location.path('/');
        }


      }
    ]
  });
