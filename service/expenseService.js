var APP = angular.module('sample')

APP.factory('expenseService', ['httpService',
    function (httpService) {

        return {
            getTodaysExpenses: function getTodaysExpenses(callback) {
                httpService.getTodaysExpenses().then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            addOrUpdateExpense: function addOrUpdateExpense(request, callback) {
                httpService.addOrUpdateExpense(request).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            searchExpensesInRange: function searchExpensesInRange(fromDate, toDate, callback){
                httpService.searchExpensesInRange(fromDate, toDate).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            }
        }
    }
]);
