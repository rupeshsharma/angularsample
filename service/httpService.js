var APP = angular.module('sample')
var CONTEXT_ROOT = "http://localhost:8081";
var APP_ROOT = "/sample"
APP.factory('httpService', ['$resource', '$http', '$timeout',
    function ($resource, $http, $timeout) {

        return {
            getCustomerByMobile: function getCustomerByMobile(mobile) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/customer/getOrCreate/" + mobile,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            updateCustomer: function updateCustomer(request) {
                return $http({
                    method: "PUT",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/customer/update",
                    data: request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            getMenu: function getMenu() {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/menu",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            getTodaysExpenses: function getTodaysExpenses() {
                return $http.get('./stubs/expense.json');
            },
            addOrUpdateExpense: function (request) {
                return { "data": request };
            },
            searchExpensesInRange: function searchExpensesInRange(from, to) {
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
                    url: CONTEXT_ROOT + APP_ROOT + "/api/menu/category/" + id,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            getItemsForCategory: function getItemsForCategory(id) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/menu/" + id + "/item",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            addItemInCategory: function addItemInCategory(request) {
                return $http({
                    method: "POST",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/menu/item",
                    data: request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            updateItemInCategory: function updateItemInCategory(request) {
                return $http({
                    method: "PUT",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/menu/item",
                    data: request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            deleteItem: function deleteItem(id) {
                return $http({
                    method: "DELETE",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/menu/item/" + id,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            getMasterData: function getMasterData() {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/master",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            createOrder: function createOrder(request) {
                return $http({
                    method: "POST",
                    data: request,
                    url: CONTEXT_ROOT + APP_ROOT + "/api/order",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

    }
]);
