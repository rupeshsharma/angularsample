var APP = angular.module('sample')
APP.factory('sessionService', ['$sessionStorage',
    function($sessionStorage) {

        return {
            getUserData: getUserData,
            setUserData: setUserData,
            clearUserSession : clearUserSession,
            setAnonymousCustomer : setAnonymousCustomer,
            isAnonymousCustomer : isAnonymousCustomer
        };

        function getUserData() {
            if($sessionStorage.userData){
                return $sessionStorage.userData;
            }else{
                var userData = {}
                return userData;
            }
        }

        function setUserData(value) {
            $sessionStorage.userData = value
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
}

]);
