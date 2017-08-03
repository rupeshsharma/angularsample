angular.
  module('sample').
  component('expense', {
    templateUrl: './component/expense/expense.template.html',
    controller: ['$scope', '$location', 'sessionService', 'expenseService',
      function expenseController($scope, $location, sessionService, expenseService) {
        getAllExpenses(expenseService);


        function getAllExpenses(expenseService) {
          expenseService.getAllExpenses(resp => {
            $scope.expenses = resp;
          });
        }
      }
    ]
  });
