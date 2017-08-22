angular.
  module('sample').
  component('customer', {
    templateUrl: './component/customer/customer.template.html',
    controller: ['$scope', '$rootScope', '$location', 'sessionService', 'userService',
      function customerController($scope, $rootScope, $location, sessionService, userService) {

        $rootScope.$on('rootScope:customerInit', function (event, data) {
           $scope.customerInit();
        });

         $scope.customerInit = function () {
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
