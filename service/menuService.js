var APP = angular.module('sample')

APP.factory('menuService', ['httpService',
    function(httpService) {

        return {
            getUserByMobile: function getUserByMobile (mobile){
                console.log("inside userservice get user by mobile func");
            return httpService.getUserByMobile(mobile);
       },
       getMenu: function getMenu(callback){
           httpService.getMenu().then(
            resp => {
                callback(resp.data); 
            }
        );
       }
      }        
    }
  ]);
