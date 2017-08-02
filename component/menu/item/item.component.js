angular.
  module('sample').
  component('item', {
    templateUrl: './component/menu/item/item.template.html',
    controller: ['$scope','$location','sessionService','userService',
      function itemController($scope, $location, sessionService, userService) {


      }
    ]
  });
