angular.
  module('sample').
  component('customer', {
    templateUrl: './component/customer/customer.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'customerService',
      function customerController($scope, $timeout, $rootScope, $location, sessionService, customerService) {

        $scope.$on('customerInit', function (event) {
           $scope.customerInit();
        });

         $scope.customerInit = function () {
           document.getElementById("loadingIndicator").style.display = 'block';
           document.getElementById("customerComponent").style.display = 'none';
           $timeout(function () {
             document.getElementById("loadingIndicator").style.display = 'none';
             document.getElementById("customerComponent").style.display = 'block';
        }, 500);
          console.debug("Customer INIT");
        }

        $("#fromDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#toDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
      }
    ]
  });
