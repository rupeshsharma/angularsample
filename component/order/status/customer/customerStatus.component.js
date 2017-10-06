angular.
  module('sample').
  component('customerStatus', {
    templateUrl: './component/order/status/customer/customerStatus.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', '$localStorage', '$interval', 'orderHistoryService',
      function customerStatusController($scope, $timeout, $rootScope, $location, $localStorage, $interval, orderHistoryService) {

        $rootScope.viewType = 'customerStatus';

        function getOrderStatus() {
          orderHistoryService.getCustomerOrderStatus(data => {
            $scope.orderList = data;
          });
        }

        getOrderStatus();

        $interval(getOrderStatus, 15000);

      }
    ]
  });
