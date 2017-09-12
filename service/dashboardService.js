var APP = angular.module('sample')

APP.factory('dashboardService', ['httpService',
    function (httpService) {
        return {
            getReviewByDate: function(reviewDate, callback){
                return httpService.getReviewByDate(reviewDate).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            }
        }
    }
]);