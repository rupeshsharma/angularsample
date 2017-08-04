angular.
  module('sample').
  component('orderHistory', {
    templateUrl: './component/order/orderHistory.template.html',
    controller: ['$scope','$location','sessionService','userService',
      function customerController($scope, $location, sessionService, userService) {


      }
    ]
  });
