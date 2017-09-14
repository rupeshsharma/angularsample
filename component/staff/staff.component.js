angular.
  module('sample').
  component('staff', {
    templateUrl: './component/staff/staff.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'userService',
      function staffController($scope, $timeout, $rootScope, $location, sessionService, userService) {

        $scope.isEdit = false;

        $scope.$on('staffInit', function (event) {
          $scope.staffInit();
        });

        $scope.staffInit = function () {
          getStaffList();
        }

        function closeLoadingIndicator() {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("staffComponent").style.display = 'block';
        }

        function getStaffList() {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("staffComponent").style.display = 'none';
          userService.getStaffList(data => {
            $scope.staffList = data;
            closeLoadingIndicator();
          });
        }

      }
    ]
  });
