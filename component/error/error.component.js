angular.
  module('sample').
  component('error', {
    templateUrl: './component/error/error.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService',
      function customerController($scope, $timeout, $rootScope, $location, sessionService) {
        $scope.error = $rootScope.globalError;
        $scope.path = $rootScope.lastFailedPath;

        $scope.tryAgain = function () {
          if ($scope.path) {
            $location.path($scope.path);
          }
        }

        $scope.goHome = function () {
          $location.path('/');
        }

      }
    ]
  });
