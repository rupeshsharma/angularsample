var APP = angular.module('sample')

APP.factory('menuService', ['httpService',
    function (httpService) {

        return {
            getUserByMobile: function getUserByMobile(mobile) {
                console.log("inside userservice get user by mobile func");
                return httpService.getUserByMobile(mobile);
            },
            getMenu: function getMenu(callback) {
                httpService.getMenu().then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            buildOrder: function buildOrder(request, callback) {
                callback();
            },
            getAllCategories: function(callback){
                httpService.getAllCategories().then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            addCategory: function(request, callback){
                httpService.addCategory(request).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            updateCategory: function(request, callback){
                httpService.updateCategory(request).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            deleteCategory: function(id, callback){
                httpService.deleteCategory(id).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            }
        }
    }
]);
