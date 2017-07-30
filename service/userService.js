var APP = angular.module('sample')

APP.factory('userService', ['httpService',
    function(httpService) {

        return {
            getUserByMobile: function getUserByMobile (mobile){
                console.log("inside userservice get user by mobile func");
            return httpService.getUserByMobile(mobile);
       }
      }        
    }
  ]);