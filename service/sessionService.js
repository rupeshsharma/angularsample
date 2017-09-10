var APP = angular.module('sample')
APP.factory('sessionService', ['$sessionStorage',
    function($sessionStorage) {

        return {
            getCustomerData: getCustomerData,
            setCustomerData: setCustomerData,
            removeCustomerData: removeCustomerData,
            clearUserSession : clearUserSession,
            setAnonymousCustomer : setAnonymousCustomer,
            isAnonymousCustomer : isAnonymousCustomer,
            setMasterData : setMasterData,
            getMasterData : getMasterData
        };

        function getCustomerData() {
            return $sessionStorage.customerData;
        }

        function setCustomerData(value) {
            $sessionStorage.customerData = value
        }

        function removeCustomerData(){
            delete $sessionStorage.customerData;
            delete $sessionStorage.isAnonymousCustomer
        }

        function clearUserSession() {
            $sessionStorage.$reset();
        }

        function setAnonymousCustomer(value){
            $sessionStorage.isAnonymousCustomer = value;
        }

        function isAnonymousCustomer(){
            return $sessionStorage.isAnonymousCustomer;
        }

        function setMasterData(data){
            $sessionStorage.masterData = data;
        }

        function getMasterData(){
            return $sessionStorage.masterData;
        }
}

]);
