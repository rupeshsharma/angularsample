angular.
  module('sample').
  component('expense', {
    templateUrl: './component/expense/expense.template.html',
    controller: ['$scope','$filter', '$location', 'sessionService', 'expenseService',
      function expenseController($scope, $filter, $location, sessionService, expenseService) {
        $scope.dateOfExpense = $filter('date')(new Date(), "dd-MM-yyyy");
        $("#dateOfExpense").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        getAllExpenses(expenseService);


        function getAllExpenses(expenseService) {
          expenseService.getAllExpenses(resp => {
            $scope.expenses = resp;
          });
        }
      }
    ]
  });
