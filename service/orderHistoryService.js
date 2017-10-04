var APP = angular.module('sample')

APP.factory('orderHistoryService', ['httpService',
    function (httpService) {
        return {
            getTodayOrderList: function getTodayOrderList(callback) {
                httpService.getTodayOrderList().then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            getOrderDetailById: function getOrderDetailById(orderId, callback) {
                httpService.getOrderDetailById(orderId).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            searchOrderHistoryInRange: function searchOrderHistoryInRange(fromOrderDate, toOrderDate, callback) {
                httpService.searchOrderHistoryInRange(fromOrderDate, toOrderDate).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            getCustomerOrderStatus: function getCustomerOrderStatus(callback) {
                httpService.getCustomerOrderStatus().then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            getOrderForStaff: function getOrderForStaff(callback) {
                httpService.getOrderForStaff().then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            setServingOrderStatus: function setServingOrderStatus(id) {
                httpService.setServingOrderStatus(id);
            },
            setCompletedOrderStatus: function (id) {
                httpService.setCompletedOrderStatus(id);
            }
        }
    }
]);
