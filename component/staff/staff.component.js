angular.
  module('sample').
  component('staff', {
    templateUrl: './component/staff/staff.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'customerService',
      function staffController($scope, $timeout, $rootScope, $location, sessionService, customerService) {

         $scope.$on('staffInit', function (event) {
           $scope.staffInit();
        });

        $scope.staffInit = function () {
           document.getElementById("loadingIndicator").style.display = 'block';
           document.getElementById("staffComponent").style.display = 'none';
           $timeout(function () {
             document.getElementById("loadingIndicator").style.display = 'none';
             document.getElementById("staffComponent").style.display = 'block';
        }, 500);
          console.debug("Staff INIT");
        }

        $scope.staffList = [
          {
            "id": 1,
            "name": "Rupesh Sharma",
            "mobile": "8826479790",
            "type": "Admin"
          }, {
            "id": 2,
            "name": "Devendra Sharma",
            "mobile": "9691639313",
            "type": "Admin"
          }

        ];
      }
    ]
  });
