angular.
  module('sample').
  component('orderHistory', {
    templateUrl: './component/order/orderHistory.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'orderHistoryService',
      function customerController($scope, $timeout, $rootScope, $location, sessionService, orderHistoryService) {

        $scope.$on('orderInit', function (event) {
          $scope.orderInit();
        });

        $scope.orderInit = function () {
          $scope.getTodayOrderList();
        }

        function closeLoadingIndicator() {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("orderComponent").style.display = 'block';
        }

        $scope.getTodayOrderList = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("orderComponent").style.display = 'none';
          orderHistoryService.getTodayOrderList(data => {
            $scope.orderHistoryList = data;
            closeLoadingIndicator();
          });

        }

        $scope.getOrderDetailById = function (orderId) {
          $scope.showOrderDetailView = false;
          document.getElementById("orderDetailLoadingIndicator").style.display = 'block';
          orderHistoryService.getOrderDetailById(orderId, data => {
            $scope.orderDetail = data;
            document.getElementById("orderDetailLoadingIndicator").style.display = 'none';
            $scope.showOrderDetailView = true;
          });
        }

        $scope.searchOrderHistoryInRange = function () {
          if ($scope.fromViewOrderHistoryDate != undefined && $scope.fromViewOrderHistoryDate != '' && $scope.toViewOrderHistoryDate != undefined && $scope.toViewOrderHistoryDate != '') {

            if ($scope.fromViewOrderHistoryDate > $scope.toViewOrderHistoryDate) {
              alert('From Date cannot be greater than To Date');
            } else {
              document.getElementById("loadingIndicator").style.display = 'block';
              document.getElementById("orderComponent").style.display = 'none';
              console.log($scope.fromViewOrderHistoryDate + " " + $scope.toViewOrderHistoryDate);
              orderHistoryService.searchOrderHistoryInRange($scope.fromViewOrderHistoryDate, $scope.toViewOrderHistoryDate, data => {
                $scope.orderHistoryList = data;
                closeLoadingIndicator();
              });
            }

          }
        }

        $("#fromViewOrderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          onSelect: function (date) {
            $scope.fromViewOrderHistoryDate = date;
          }
        });
        $("#toViewOrderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          onSelect: function (date) {
            $scope.toViewOrderHistoryDate = date;
          }
        });

      }
    ]
  });
