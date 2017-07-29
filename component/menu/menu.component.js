angular.
  module('sample').
  component('menu', {
    templateUrl: './component/menu/menu.template.html',
    controller: ['$scope', 'sessionService',
      function menuController($scope, sessionService) {
        $scope.pageName = "Menu ******";

$scope.mobile = sessionService.getUserData().mobile;
        console.log(sessionService.getUserData());
      }
    ]
  });