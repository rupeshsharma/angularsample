angular.
  module('sample').
  component('menu', {
    templateUrl: './component/menu/menu.template.html',
    controller: ['$scope', 'sessionService',
      function menuController($scope, sessionService) {
        $scope.pageName = "Menu ******";
var userData = sessionService.getUserData();
$scope.mobile = userData.mobile;
$scope.name = userData.name;
        console.log("********"+JSON.stringify(userData));
      }
    ]
  });