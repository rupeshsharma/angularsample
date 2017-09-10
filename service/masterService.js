var APP = angular.module('sample')

APP.factory('masterService', ['httpService',
    function(httpService) {

        return {
            getMasterData: function getMasterData (callback){
            httpService.getMasterData().then(
            resp => {
                callback(resp.data); 
            }
        );
       }
      }        
    }
  ]);
