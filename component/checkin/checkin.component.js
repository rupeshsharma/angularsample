angular.
  module('sample').
  component('checkIn', {
    templateUrl: './component/checkin/checkin.template.html',
    controller: ['$scope','sessionService',
      function checkInController($scope, sessionService) {
        $scope.pageName = "CHECK IN ******";

        $scope.checkIn = function(){
console.log($scope.mobile);

var userData = {
  "mobile" : $scope.mobile
}

sessionService.setUserData(userData);
        }

      }
    ]
  });