angular.
  module('sample').
  component('customerStatus', {
    templateUrl: './component/order/status/customer/customerStatus.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', '$localStorage', '$interval',
      function customerStatusController($scope, $timeout, $rootScope, $location, $localStorage, $interval) {

        $scope.orderList = [{"orderNumber":111,"orderStatus":"Preparing"},
        {"orderNumber":222,"orderStatus":"Preparing"},
        {"orderNumber":333,"orderStatus":"Serving"},
        {"orderNumber":444,"orderStatus":"Preparing"},
        {"orderNumber":555,"orderStatus":"Received"},
        {"orderNumber":666,"orderStatus":"Received"},
        {"orderNumber":777,"orderStatus":"Preparing"}];



      }
    ]
  });
