angular.
  module('sample').
  component('staff', {
    templateUrl: './component/staff/staff.template.html',
    controller: ['$scope', '$location', 'sessionService', 'userService',
      function staffController($scope, $location, sessionService, userService) {
        $scope.staffList = [
          {
"id":1,
"name":"Rupesh Sharma",
"mobile":"8826479790",
"type":"Admin"
          },{
"id":2,
"name":"Devendra Sharma",
"mobile":"9691639313",
"type":"Admin"
          }

        ];
      }
    ]
  });
