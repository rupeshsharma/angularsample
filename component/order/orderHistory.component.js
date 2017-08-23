angular.
  module('sample').
  component('orderHistory', {
    templateUrl: './component/order/orderHistory.template.html',
    controller: ['$scope', '$rootScope', '$location','sessionService','userService',
      function customerController($scope, $rootScope, $location, sessionService, userService) {

        $scope.$on('orderInit', function (event) {
           $scope.orderInit();
        });

         $scope.orderInit = function () {
           document.getElementById("loadingIndicator").style.display = 'block';
           document.getElementById("orderComponent").style.display = 'none';
           $timeout(function () {
             document.getElementById("loadingIndicator").style.display = 'none';
             document.getElementById("orderComponent").style.display = 'block';
        }, 500);
          console.debug("Order INIT");
        }

        $("#fromViewOrderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#toViewOrderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });

      }
    ]
  });
