var APP = angular.module('sample')

APP.factory('httpService', ['$resource',
    function($resource) {
        
    
        return {
      getUserByMobile: function getUserByMobile (mobile){
          var user ={
              "mobile" : "1234512345",
              "name" : "Test User"
          }
       return user;
      }
      }    
      
    }
  ]);