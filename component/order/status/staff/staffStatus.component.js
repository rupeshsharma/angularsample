angular.
  module('sample').
  component('staffStatus', {
    templateUrl: './component/order/status/staff/staffStatus.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', '$localStorage', '$interval', 'orderHistoryService',
      function staffStatusController($scope, $timeout, $rootScope, $location, $localStorage, $interval, orderHistoryService) {
        $rootScope.viewType = 'staffStatus';

        function getOrderForStaff() {
          orderHistoryService.getOrderForStaff(data => {
            $scope.orderList = data;
          });
        }

        getOrderForStaff();

        $interval(getOrderForStaff, 15000);

        $scope.updateOrderStatus = function (status, orderData) {
          if (status == 0) {
            orderHistoryService.setServingOrderStatus(orderData.id);
            orderData.status = 'Serving';
          } else {
            orderHistoryService.setCompletedOrderStatus(orderData.id);
            var index = $scope.orderList.indexOf(orderData);
            $scope.orderList.splice(index, 1);
          }
        }

      }
    ]
  });
