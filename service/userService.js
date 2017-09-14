var APP = angular.module('sample')

APP.factory('userService', ['httpService',
    function (httpService) {
        return {
            getStaffList: function (callback) {
                httpService.getStaffList().then(
                    resp => {
                        callback(resp.data);
                    }
                );
            }
        }
    }
]);
