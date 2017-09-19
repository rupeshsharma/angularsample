angular.
  module('sample').
  component('masterData', {
    templateUrl: './component/masterData/masterData.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'masterService',
      function masterDataController($scope, $timeout, $rootScope, $location, sessionService, masterService) {

        $scope.$on('masterDataInit', function (event) {
          $scope.masterDataInit();
        });

        $scope.masterDataInit = function () {
          $scope.masterData = sessionService.getMasterData();
          //$scope.masterData = {
          //  "a": ["1", "2", "3"],
           // "b": ["4", "5", "6"],
           // "c": ["8", "9", "10"]
         // }
          closeLoadingIndicator();
        }

        $scope.showEditValueModal = function () {
          $scope.isEdit = true;
          $scope.newValue = $scope.selectedMasterDataValue;
        }

        $scope.showAddValueModal = function () {
          $scope.isEdit = false;
          $scope.newValue = '';
          if ($scope.currentActiveListItem) {
            document.getElementById($scope.currentActiveListItem).classList.remove("active");
          }
          $scope.setDefault();
        }

        $scope.selectMasterDataValue = function (value, sel) {
          $scope.selectedMasterDataValue = value;
          if ($scope.currentActiveListItem) {
            document.getElementById($scope.currentActiveListItem).classList.remove("active");
          }
          document.getElementById(value).classList.add("active");
          $scope.currentActiveListItem = value;
        }

        $scope.setDefault = function () {
          $scope.selectedMasterDataValueList = $scope.masterData[$scope.selectedMasterData];
          $scope.selectedMasterDataValue = undefined;
          $scope.currentActiveListItem = undefined;
        }

        function closeLoadingIndicator() {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("masterDataComponent").style.display = 'block';
        }

        $scope.addEditMasterDataValue = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("masterDataComponent").style.display = 'none';
          if (!$scope.isEdit) {
            masterService.addMasterDataValue($scope.selectedMasterData, $scope.newValue, resp => {
              $scope.masterData[$scope.selectedMasterData].push($scope.newValue);
              sessionService.setMasterData($scope.masterData);
              $("#addMasterDataValueModal .close").click();
              closeLoadingIndicator();
            });
          } else {
            masterService.updateMasterDataValue($scope.selectedMasterData, $scope.selectedMasterDataValue, $scope.newValue, resp => {
              var index = $scope.masterData[$scope.selectedMasterData].indexOf($scope.selectedMasterDataValue);
              $scope.masterData[$scope.selectedMasterData][index] = $scope.newValue;
              sessionService.setMasterData($scope.masterData);
              $scope.currentActiveListItem = undefined;
              $("#addMasterDataValueModal .close").click();
              closeLoadingIndicator();
            });
          }
        }

        $scope.removeMasterDataValue = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("masterDataComponent").style.display = 'none';
          masterService.removeMasterDataValue($scope.selectedMasterData, $scope.selectedMasterDataValue, resp => {
            var index = $scope.masterData[$scope.selectedMasterData].indexOf($scope.selectedMasterDataValue);
            $scope.currentActiveListItem = undefined;
            $scope.masterData[$scope.selectedMasterData].splice(index, 1);
            sessionService.setMasterData($scope.masterData);
            $("#addMasterDataValueModal .close").click();
            closeLoadingIndicator();
          });
        }

      }
    ]
  });
