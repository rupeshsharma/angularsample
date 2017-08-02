angular.
  module('sample').
  component('customer', {
    templateUrl: './component/customer/customer.template.html',
    controller: ['$scope','$location','sessionService','userService',
      function customerController($scope, $location, sessionService, userService) {


      }
    ]
  });
