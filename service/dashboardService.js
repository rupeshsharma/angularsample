var APP = angular.module('sample')

APP.factory('dashboardService', ['httpService',
    function (httpService) {
        return {
            getReviewByDate: function (reviewDate, callback) {
                return httpService.getReviewByDate(reviewDate).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            getTotalOrderInRange: function (fromDate, toDate, callback) {
                return httpService.getTotalOrderInRange(fromDate, toDate).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            getTotalItemInRange: function (fromDate, toDate, callback) {
                return httpService.getTotalItemInRange(fromDate, toDate).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            getTotalExpenseInRange: function (fromDate, toDate, callback) {
                return httpService.getTotalExpenseInRange(fromDate, toDate).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            getTotalCollectionInRange: function (fromDate, toDate, callback) {
                return httpService.getTotalCollectionInRange(fromDate, toDate).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            getChartData: function (request, callback) {
                return httpService.getChartData(request).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            getPerItemChartData: function(request, id, callback){
                return httpService.getPerItemChartData(request, id).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            }
        }
    }
]);
