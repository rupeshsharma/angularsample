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
            $scope.staffFormData.email = data.email;
            $scope.staffFormData.contact = data.contact;
            $scope.staffFormData.role = data.role;
          }

        }

        $scope.removeStaff = function (data) {
          userService.removeStaff(data.id, function () {
            var index = $scope.staffList.indexOf(data);
            $scope.staffList.splice(index, 1);
          });
        }

        $scope.createOrUpdateStaff = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("staffComponent").style.display = 'none';
          if ($scope.isEdit) {
            userService.updateUser($scope.staffFormData, data => {
              $scope.selectedStaff.name = data.name;
              $scope.selectedStaff.email = data.email
              $scope.selectedStaff.contact = data.contact;
              $scope.selectedStaff.role = data.role;
              closeLoadingIndicator();
              $("#staffModal .close").click();
            });
          } else {
            userService.createUser($scope.staffFormData, data => {
              $scope.staffList.push(data);
              closeLoadingIndicator();
              $("#staffModal .close").click();
            });
          }
        }

        $scope.changePassword = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("staffComponent").style.display = 'none';
          userService.changePassword({ "id": $scope.staffFormData.id, "password": $scope.newStaffPassword }, data => {
            closeLoadingIndicator();
            $("#staffPasswordModal .close").click();
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
