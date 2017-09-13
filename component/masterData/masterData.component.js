angular.
  module('sample').
  component('masterData', {
    templateUrl: './component/masterData/masterData.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'customerService',
      function masterDataController($scope, $timeout, $rootScope, $location, sessionService, customerService) {
        
        $scope.$on('masterDataInit', function (event) {
           $scope.masterDataInit();
        });

         $scope.masterDataInit = function () {
           document.getElementById("loadingIndicator").style.display = 'block';
           document.getElementById("masterDataComponent").style.display = 'none';
           $timeout(function () {
             document.getElementById("loadingIndicator").style.display = 'none';
             document.getElementById("masterDataComponent").style.display = 'block';
        }, 500);
          console.debug("masterDataComponent INIT");
        }

      }
    ]
  });
