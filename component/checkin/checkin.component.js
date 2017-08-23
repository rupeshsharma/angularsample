angular.
  module('sample').
  component('checkIn', {
    templateUrl: './component/checkin/checkin.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location','sessionService','userService',
      function checkInController($scope, $timeout, $rootScope, $location, sessionService, userService) {
        $rootScope.viewType = 'checkin';
        $scope.checkIn = function(isAnonymous){
          if(!isAnonymous){
            sessionService.isAnonymousCustomer(false);
            userService.getUserByMobile($scope.mobile, resp => {
              sessionService.setUserData(resp);
            });
          }else{
            sessionService.setAnonymousCustomer(true);
          }
          $location.path('/menu');
        }
        
        $scope.logOut = function(){
          sessionService.logOut();
        }

      }
    ]
  });
