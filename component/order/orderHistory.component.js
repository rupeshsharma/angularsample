angular.
  module('sample').
  component('orderHistory', {
    templateUrl: './component/order/orderHistory.template.html',
    controller: ['$scope','$location','sessionService','userService',
      function customerController($scope, $location, sessionService, userService) {

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
