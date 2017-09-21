var APP = angular.module('sample')
var CONTEXT_ROOT = "http://localhost:8081";
var APP_ROOT = "/sample"
APP.factory('httpService', ['$resource', '$http', '$timeout', 'sessionService',
    function ($resource, $http, $timeout, sessionService) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + sessionService.getXAuthHeader();
        return {
            authenticate: function authenticate(request) {
                return $http({
                    method: "POST",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/login",
                    data: request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
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
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/expense/today",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/expense.json');
            },
            addOrUpdateExpense: function (request) {
                return $http({
                    method: "POST",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/expense/createOrUpdate",
                    data: request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            searchExpensesInRange: function searchExpensesInRange(from, to) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/expense/search/" + from + "/" + to,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/expense.json');
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
            },
            getTodayOrderList: function getTodayOrderList() {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/order/today",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/orderHistory.json');
            },
            getOrderDetailById: function getOrderDetailById(orderId) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/order/" + orderId,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/orderDetail.json');
            },
            searchOrderHistoryInRange: function searchOrderHistoryInRange(fromOrderDate, toOrderDate) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/order/search/" + fromOrderDate + "/" + toOrderDate,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/orderHistory.json');
            },
            getReviewByDate: function getReviewByDate(reviewDate) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/order/review/" + reviewDate,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/reviewData.json');
            },
            searchCustomerVisitedBefore: function searchCustomerVisitedBefore(lastVisitedDate) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/customer/visitBefore/" + lastVisitedDate,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/searchCustomer.json');
            },
            getCustomerHistory: function getCustomerHistory(id) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/order/history/customer/" + id,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/orderHistory.json');
            },
            getTotalOrderInRange: function getTotalOrderInRange(fromDate, toDate) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/order/total/" + fromDate + "/" + toDate,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/dashboardData.json');
            },
            getTotalItemInRange: function getTotalItemInRange(fromDate, toDate) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/order/total/item/" + fromDate + "/" + toDate,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/dashboardData.json');
            },
            getTotalExpenseInRange: function getTotalExpenseInRange(fromDate, toDate) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/expense/total/" + fromDate + "/" + toDate,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/dashboardData.json');
            },
            getTotalCollectionInRange: function getTotalCollectionInRange(fromDate, toDate) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/order/total/collection/" + fromDate + "/" + toDate,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/dashboardData.json');
            },
            getChartData: function getChartData(request) {
                return $http({
                    method: "POST",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/chart/dashboardGraph",
                    data:request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // if (request.renderChartBy == 'm') {
                //     return $http.get('./stubs/monthlyChartData.json');
                // } else if (request.renderChartBy == 'y') {
                //     return $http.get('./stubs/yearlyChartData.json');
                // } else {
                //     return $http.get('./stubs/dailyChartData.json');
                // }
            },
            getWholeItemGraph: function getWholeItemGraph() {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/chart/wholeItemGraph",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/wholeItemGraph.json');
            },
            showWholeItemGraphInRange: function (fromDate, toDate) {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/chart/wholeItemGraph/" + fromDate + "/" + toDate,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            getStaffList: function getStaffList() {
                return $http({
                    method: "GET",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/user",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/staffData.json');
            },
            updateUser: function updateUser(request) {
                return $http({
                    method: "PUT",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/user/update",
                    data: request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            createUser: function createUser(request) {
                return $http({
                    method: "POST",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/user/create",
                    data: request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            changePassword: function changePassword(request) {
                return $http({
                    method: "POST",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/user/changePassword",
                    data: request,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            updateLastVisit: function updateLastVisit(id) {
                return $http({
                    method: "PUT",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/customer/" + id + "/lastVisit",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            addMasterDataValue: function addMasterDataValue(type, value) {
                return $http({
                    method: "POST",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/master/add/" + type + "/" + value,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/staffData.json');
            },
            removeMasterDataValue: function removeMasterDataValue(type, value) {
                return $http({
                    method: "DELETE",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/master/remove/" + type + "/" + value,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/staffData.json');
            },
            updateMasterDataValue: function updateMasterDataValue(type, previousValue, newValue) {
                return $http({
                    method: "PUT",
                    url: CONTEXT_ROOT + APP_ROOT + "/api/master/update/" + type + "/" + previousValue + "/" + newValue,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // return $http.get('./stubs/staffData.json');
            }
        }

    }
]);
