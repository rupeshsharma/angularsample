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
