angular.
  module('sample').
  component('dashBoard', {
    templateUrl: './component/dashboard/dashboard.template.html',
    controller: ['$scope', '$timeout', '$location', 'sessionService', 'menuService',
      function dashBoardController($scope, $timeout, $location, sessionService, menuService) {
        
			}
    ]
  });
