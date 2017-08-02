angular.
  module('sample').
  component('category', {
    templateUrl: './component/menu/category/category.template.html',
    controller: ['$scope','$location','sessionService','userService',
      function categoryController($scope, $location, sessionService, userService) {


      }
    ]
  });
