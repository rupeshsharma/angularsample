angular.
  module('sample').
  component('staffStatus', {
    templateUrl: './component/order/status/staff/staffStatus.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', '$localStorage', '$interval',
      function staffStatusController($scope, $timeout, $rootScope, $location, $localStorage, $interval) {
        $rootScope.viewType = 'staffStatus'; 
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
