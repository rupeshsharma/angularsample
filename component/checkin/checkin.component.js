angular.
  module('sample').
  component('checkIn', {
    templateUrl: './component/checkin/checkin.template.html',
    controller: ['$scope','$location','sessionService','userService',
      function checkInController($scope, $location, sessionService, userService) {

        $scope.checkIn = function(){
          userService.getUserByMobile($scope.mobile, resp => {
            sessionService.setUserData(resp);
          });  
          $location.path('/menu');
        }

      }
    ]
  });
