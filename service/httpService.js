var APP = angular.module('sample')

APP.factory('httpService', ['$resource','$http','$timeout',
    function($resource, $http, $timeout) {
        
    
    return {
        getUserByMobile: function getUserByMobile (mobile){
            return $http.get('./stubs/user.json');
        },
        getMenu: function getMenu() {
            return $http.get('./stubs/menu.json');
        },
        getAllExpenses: function getAllExpenses(){
            return $http.get('./stubs/expense.json');
        }
      }    
      
    }
  ]);
