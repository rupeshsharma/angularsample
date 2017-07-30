angular.
  module('sample').
  component('menu', {
    templateUrl: './component/menu/menu.template.html',
    controller: ['$scope', '$location','sessionService',
      function menuController($scope, $location, sessionService) {
        $scope.pageName = "Menu ******";
var userData = sessionService.getUserData();
$scope.mobile = userData.mobile;
$scope.name = userData.name;
        console.log("********"+JSON.stringify(userData));

        $scope.clearSession = function(){
          sessionService.clearUserSession();
          $location.path('/');
        }
      }
    ]
  });