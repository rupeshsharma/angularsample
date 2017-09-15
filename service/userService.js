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
            },

            updateUser: function (request, callback) {
                httpService.updateUser(request).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },

            createUser: function (request, callback) {
                httpService.createUser(request).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },

            changePassword: function (request, callback) {
                httpService.changePassword(request).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            }
        }
    }
]);
