angular.
  module('sample').
  component('customer', {
    templateUrl: './component/customer/customer.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'customerService', 'orderHistoryService',
      function customerController($scope, $timeout, $rootScope, $location, sessionService, customerService, orderHistoryService) {

        $scope.$on('customerInit', function (event) {
          $scope.customerInit();
        });

        $scope.customerInit = function () {
          closeLoadingIndicator();
          $scope.customerList = [];
        }

        $scope.searchLastVisited = function () {
          if ($scope.lastVisitedDate != undefined && $scope.lastVisitedDate != '') {
            document.getElementById("loadingIndicator").style.display = 'block';
            document.getElementById("customerComponent").style.display = 'none';
            customerService.searchCustomerVisitedBefore($scope.lastVisitedDate, data => {
              $scope.customerList = data;
              closeLoadingIndicator();
            })
          }
        }

        $scope.showCustomerHistory = function (customer) {
          $scope.selectedCustomer = customer;
          customerService.getCustomerHistory(customer.id, data => {
            $scope.customerOrderHistoryList = data;
          });
        }

        $scope.showAdvanceSearchModal = function () {
          $scope.searchCustomer = {};
        }

        $scope.advanceSearch = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("customerComponent").style.display = 'none';
          customerService.advanceSearch($scope.searchCustomer, data => {
            $scope.customerList = data;
            $("#advanceSearchModal .close").click();
            closeLoadingIndicator();
          });
        }

        $scope.viewOrderDetail = function (id) {
          orderHistoryService.getOrderDetailById(id, data => {
            $scope.orderDetail = data;
          });
        }

        function closeLoadingIndicator() {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("customerComponent").style.display = 'block';
        }

        $("#lastVisitedDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: -1,
          onSelect: function (date) {
            $scope.lastVisitedDate = date;
          }

        });

      }
    ]
  });
