angular.
  module('sample').
  component('checkIn', {
    templateUrl: './component/checkin/checkin.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location','sessionService','customerService', 'masterService',
      function checkInController($scope, $timeout, $rootScope, $location, sessionService, customerService, masterService) {
        $rootScope.viewType = 'checkin';

        $scope.checkIn = function(isAnonymous){
          if(!isAnonymous){
              document.getElementById("loadingIndicator").style.display = 'block';
              document.getElementById("checkInComponent").style.display = 'none';
              sessionService.isAnonymousCustomer(false);
              customerService.getCustomerByMobile($scope.customerMobile, resp => {
              sessionService.setCustomerData(resp);
              closeLoadingIndicator();
              sessionService.removeOrderDetail();
              $location.path('/menu');
            });
          }else{
              sessionService.setAnonymousCustomer(true);
              $location.path('/menu');
          }
          
        }

        function closeLoadingIndicator() {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("checkInComponent").style.display = 'block';
        }
        
        $scope.logOut = function(){
          sessionService.logOut();
        }

      }
    ]
  });
