var APP = angular.module('sample')

APP.factory('customerService', ['httpService',
    function (httpService) {

        return {
            getCustomerByMobile: function getCustomerByMobile(mobile, callback) {
                return httpService.getCustomerByMobile(mobile).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            updateCustomer: function updateCustomer(request, callback) {
                return httpService.updateCustomer(request).then(
                    resp => {
                        callback(resp.data);
                    });
            }
        }
    }
]);
