angular.
  module('sample').
  component('checkIn', {
    templateUrl: './component/checkin/checkin.template.html',
    controller: ['$scope','$location','sessionService','userService',
      function checkInController($scope, $location, sessionService, userService) {
        $scope.pageName = "CHECK IN ******";

        $scope.checkIn = function(){
        console.log($scope.mobile);

        var userData = userService.getUserByMobile($scope.mobile);

        sessionService.setUserData(userData);

        $location.path('/menu');
        }

      }
    ]
  });