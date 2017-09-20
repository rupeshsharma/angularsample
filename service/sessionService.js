var APP = angular.module('sample')
APP.factory('sessionService', ['$sessionStorage',
    function ($sessionStorage) {

        return {
            getCustomerData: getCustomerData,
            setCustomerData: setCustomerData,
            removeCustomerData: removeCustomerData,
            clearUserSession: clearUserSession,
            setAnonymousCustomer: setAnonymousCustomer,
            isAnonymousCustomer: isAnonymousCustomer,
            setMasterData: setMasterData,
            getMasterData: getMasterData,
            setOrderDetail: setOrderDetail,
            getOrderDetail: getOrderDetail,
            removeOrderDetail: removeOrderDetail,
            setXAuthHeader: setXAuthHeader,
            getXAuthHeader: getXAuthHeader,
            setLoggedInUserData: setLoggedInUserData,
            getLoggedInUserData: getLoggedInUserData
        };
        
        function setLoggedInUserData(data) {
            $sessionStorage.loggedInUser = data;
        }

        function getLoggedInUserData() {
            return $sessionStorage.loggedInUser;
        }

        function setXAuthHeader(xAuthData) {
            $sessionStorage.xAuthData = xAuthData;
        }

        function getXAuthHeader() {
            return $sessionStorage.xAuthData;
        }

        function getCustomerData() {
            return $sessionStorage.customerData;
        }

        function setCustomerData(value) {
            $sessionStorage.customerData = value
        }

        function removeCustomerData() {
            delete $sessionStorage.customerData;
            delete $sessionStorage.isAnonymousCustomer
        }

        function clearUserSession() {
            $sessionStorage.$reset();
        }

        function setAnonymousCustomer(value) {
            $sessionStorage.isAnonymousCustomer = value;
        }

        function isAnonymousCustomer() {
            return $sessionStorage.isAnonymousCustomer;
        }

        function setMasterData(data) {
            $sessionStorage.masterData = data;
        }

        function getMasterData() {
            return $sessionStorage.masterData;
        }

        function setOrderDetail(data) {
            $sessionStorage.orderDetail = data;
        }

        function getOrderDetail() {
            return $sessionStorage.orderDetail;
        }

        function removeOrderDetail(){
            delete $sessionStorage.orderDetail;
        }
    }

]);
