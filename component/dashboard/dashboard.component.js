angular.
  module('sample').
  component('dashBoard', {
    templateUrl: './component/dashboard/dashboard.template.html',
    controller: ['$scope', '$timeout', '$location', 'sessionService', 'menuService',
      function dashBoardController($scope, $timeout, $location, sessionService, menuService) {
        $("#orderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#fromOrderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#toOrderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#itemDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#fromItemDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#toItemDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#collectionDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#fromCollectionDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#toCollectionDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
			}
    ]
  });
