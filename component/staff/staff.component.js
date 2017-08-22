angular.
  module('sample').
  component('staff', {
    templateUrl: './component/staff/staff.template.html',
    controller: ['$scope', '$rootScope', '$location', 'sessionService', 'userService',
      function staffController($scope, $rootScope, $location, sessionService, userService) {

         $scope.$on('staffInit', function (event) {
           $scope.staffInit();
        });

        $scope.staffInit = function () {
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
