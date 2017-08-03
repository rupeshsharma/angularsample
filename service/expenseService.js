var APP = angular.module('sample')

APP.factory('expenseService', ['httpService',
    function(httpService) {

        return {
            getAllExpenses: function getAllExpenses (callback){
            httpService.getAllExpenses().then(
            resp => {
                callback(resp.data); 
            }
        );
       }
      }        
    }
  ]);
