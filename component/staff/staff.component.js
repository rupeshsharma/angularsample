angular.
  module('sample').
  component('staff', {
    templateUrl: './component/staff/staff.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'userService',
      function staffController($scope, $timeout, $rootScope, $location, sessionService, userService) {

        $scope.isEdit = false;
        $scope.staffFormData = {};
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

        $scope.showAddEditStaffForm = function (isEdit, data) {
          $scope.selectedStaff = data;
          $scope.isEdit = isEdit;
          if (!isEdit) {
            $scope.staffFormData = {};
          } else {
            $scope.staffFormData.id = data.id;
            $scope.staffFormData.name = data.name;
            $scope.staffFormData.mobile = data.mobile;
            $scope.staffFormData.role = data.role;
          }

        }

        $scope.updateStaff = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("staffComponent").style.display = 'none';
          userService.updateUser($scope.staffFormData, data => {
            $scope.selectedStaff.name = data.name;
            $scope.selectedStaff.mobile = data.mobile
            $scope.selectedStaff.role = data.role;
            closeLoadingIndicator();
          });
        }

        $scope.createStaff = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("staffComponent").style.display = 'none';
          userService.createUser($scope.staffFormData, data => {
            $scope.staffList.push(data);
            closeLoadingIndicator();
          });
        }

        $scope.changePassword = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("staffComponent").style.display = 'none';
          userService.changePassword($scope.staffFormData, data => {
            closeLoadingIndicator();
          });
        }

        $scope.showPasswordStaffForm = function (data) {
          $scope.staffFormData = {};
          $scope.staffFormData.id = data.id;
          $scope.staffFormData.name = data.name;
        }

      }
    ]
  });
