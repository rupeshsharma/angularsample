var APP = angular.module('sample')
APP.service('sessionService', function () {

        var userData ={};

        return {
            getUserData: getUserData,
            setUserData: setUserData
        };

        function getUserData() {
            return userData;
        }

        function setUserData(value) {
            userData = value;
        }
});