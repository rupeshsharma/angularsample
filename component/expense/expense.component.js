angular.
  module('sample').
  component('expense', {
    templateUrl: './component/expense/expense.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$filter', '$location', 'sessionService', 'expenseService',
      function expenseController($scope, $timeout, $rootScope, $filter, $location, sessionService, expenseService) {

        $scope.$on('expenseInit', function (event) {
          $scope.expenseInit();
        });

        $scope.expenseInit = function () {
          $scope.masterData = sessionService.getMasterData();
          $scope.getTodaysExpenses();
        }

        function closeLoadingIndicator() {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("expenseComponent").style.display = 'block';
        }

        $("#fromExpenseDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          onSelect: function (date) {
            $scope.searchExpenseFrom = date;
          }
        });
        $("#toExpenseDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          onSelect: function (date) {
            $scope.searchExpenseTo = date;
          }
        });

        $("#dateOfExpense").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          onSelect: function (date) {
            $scope.expenseData.dateOfExpense = date;
          }
        });

        $scope.getTodaysExpenses = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("expenseComponent").style.display = 'none';
          $scope.expenseData = {};
          $scope.isTodayList = true;
          expenseService.getTodaysExpenses(resp => {
            $scope.expenses = resp;
            closeLoadingIndicator();
          });
        }

        $scope.addOrUpdateExpense = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("expenseComponent").style.display = 'none';
          console.log($scope.expenseData)
          expenseService.addOrUpdateExpense($scope.expenseData, data => {
            if ($scope.isEdit) {
              $scope.selectedExpense.type = data.type;
              $scope.selectedExpense.category = data.category;
              $scope.selectedExpense.description = data.description;
              $scope.selectedExpense.amount = data.amount;
              $scope.selectedExpense.paymentMode = data.paymentMode;
              $scope.selectedExpense.dateOfExpense = data.dateOfExpense;
            } else if ($scope.isTodayList) {
              $scope.expenses.push(data);
            }
            $scope.expenseData = {};
            closeLoadingIndicator();
            $("#addEditExpenseModal .close").click();
          });
        }

        $scope.searchExpenses = function () {
          $scope.isTodayList = false;
          if ($scope.searchExpenseFrom != undefined && $scope.searchExpenseFrom != '' && $scope.searchExpenseTo != undefined && $scope.searchExpenseTo != '') {

            if ($scope.searchExpenseFrom > $scope.searchExpenseTo) {
              alert('From Date cannot be greater than To Date');
            } else {
              document.getElementById("loadingIndicator").style.display = 'block';
              document.getElementById("expenseComponent").style.display = 'none';
              console.log($scope.searchExpenseFrom + " " + $scope.searchExpenseTo);
              expenseService.searchExpensesInRange($scope.searchExpenseFrom, $scope.searchExpenseTo, data => {
                $scope.expenses = data;
                closeLoadingIndicator();
              });
            }

          }
        }

        $scope.showAddEditExpenseModal = function (data, isEdit) {
          $scope.isEdit = isEdit;
          if (isEdit) {
            $scope.selectedExpense = data;
            $scope.expenseModalTitle = 'Edit Expense';
            $scope.expenseData.id = data.id;
            $scope.expenseData.type = data.type;
            $scope.expenseData.category = data.category;
            $scope.expenseData.description = data.description;
            $scope.expenseData.amount = data.amount;
            $scope.expenseData.paymentMode = data.paymentMode;
            $scope.expenseData.dateOfExpense = data.dateOfExpense;
          } else {
            $scope.expenseModalTitle = 'Add Expense';
            $scope.expenseData = {};
            $scope.expenseData.dateOfExpense = $filter('date')(new Date(), "dd-MM-yyyy");
          }

        }
      }
    ]
  });
