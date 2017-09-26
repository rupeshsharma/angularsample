angular.
  module('sample').
  component('customerView', {
    templateUrl: './component/order/customerView/customerView.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', '$localStorage', '$interval',
      function customerViewController($scope, $timeout, $rootScope, $location, $localStorage, $interval) {
        function getOrderDetail() {
          $scope.cart = $localStorage.somedata;
          $scope.discount = $localStorage.discount;
          $scope.customer = ($localStorage.customer != undefined && $localStorage.customer != '')?$localStorage.customer:'Guest'
        }
        getOrderDetail();
         $interval(getOrderDetail , 100);
      }
    ]
  });
