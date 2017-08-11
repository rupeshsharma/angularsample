angular.
  module('sample').
  component('expense', {
    templateUrl: './component/expense/expense.template.html',
    controller: ['$scope','$filter', '$location', 'sessionService', 'expenseService',
      function expenseController($scope, $filter, $location, sessionService, expenseService) {

        $("#fromExpenseDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#toExpenseDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });

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
