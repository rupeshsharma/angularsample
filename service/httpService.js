var APP = angular.module('sample')
var CONTEXT_ROOT = "http://localhost:8081";
var APP_ROOT = "/sample"
APP.factory('httpService', ['$resource', '$http', '$timeout',
    function ($resource, $http, $timeout) {

        return {
            getUserByMobile: function getUserByMobile(mobile) {
                return $http.get('./stubs/user.json');
            },
            getMenu: function getMenu() {
                return $http.get('./stubs/menu.json');
            },
            getAllExpenses: function getAllExpenses() {
                return $http.get('./stubs/expense.json');
            },
            getAllCategories: function getAllCategories() {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/menu/category",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            addCategory: function addCategory(request) {
                return $http({
                    method: "POST",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/menu/category",
                    data: request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            updateCategory: function updateCategory(request) {
                return $http({
                    method: "PUT",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/menu/category",
                    data: request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            deleteCategory: function deleteCategory(id) {
                return $http({
                    method: "DELETE",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/menu/category/"+id,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

    }
]);
