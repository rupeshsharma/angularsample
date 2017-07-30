var APP = angular.module('sample')
APP.factory('sessionService', ['$sessionStorage',
    function($sessionStorage) {

        return {
            getUserData: getUserData,
            setUserData: setUserData,
            clearUserSession : clearUserSession
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
}

]);