var APP = angular.module('sample')

APP.factory('userService', ['httpService',
    function(httpService) {

        return {
            getUserByMobile: function getUserByMobile (mobile, callback){
            return httpService.getUserByMobile(mobile).then(
            resp => {
                callback(resp.data); 
            }
        );
       }
      }        
    }
  ]);
