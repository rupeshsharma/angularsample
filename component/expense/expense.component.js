angular.
  module('sample').
  component('expense', {
    templateUrl: './component/expense/expense.template.html',
    controller: ['$scope', '$timeout', '$rootScope','$filter', '$location', 'sessionService', 'expenseService',
      function expenseController($scope, $timeout, $rootScope, $filter, $location, sessionService, expenseService) {
        $scope.$on('expenseInit', function (event) {
           $scope.expenseInit();
        });

         $scope.expenseInit = function () {
           document.getElementById("loadingIndicator").style.display = 'block';
           document.getElementById("expenseComponent").style.display = 'none';
           $timeout(function () {
             document.getElementById("loadingIndicator").style.display = 'none';
             document.getElementById("expenseComponent").style.display = 'block';
        }, 500);
          console.debug("Expense INIT");
        }

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
