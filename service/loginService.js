var APP = angular.module('sample')

APP.factory('loginService', ['httpService',
    function (httpService) {
        return {
            authenticate: function (credential, successCallback, errorCallback) {
                httpService.authenticate(credential).then(
                    resp => {
                        successCallback(resp.data);
                    },
                    errResp => {
                        errorCallback(errResp);
                    }
                );
            }
        }
    }
]);
