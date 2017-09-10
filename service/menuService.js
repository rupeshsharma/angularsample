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
                httpService.createOrder(request).then(
                    resp => {
                        callback(resp.data);
                    }
                );
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
            },
            getItemsForCategory: function(id, callback){
                httpService.getItemsForCategory(id).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            addItemInCategory: function(request, callback){
                httpService.addItemInCategory(request).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            updateItemInCategory: function(request, callback){
                httpService.updateItemInCategory(request).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            deleteItem: function(id, callback){
                httpService.deleteItem(id).then(
                    resp => {
                        callback(resp.data);
                    }
                );
            }
        }
    }
]);
