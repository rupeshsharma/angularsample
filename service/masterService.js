var APP = angular.module('sample')

APP.factory('masterService', ['httpService',
    function (httpService) {

        return {
            getMasterData: function getMasterData(callback) {
                httpService.getMasterData().then(
                    resp => {
                        callback(resp.data);
                    }
                );
            },
            addMasterDataValue: function (key, value, callback) {
                httpService.addMasterDataValue(key, value).then(
                    resp => {
                        callback(resp);
                    }
                );
            },
            removeMasterDataValue: function (key, value, callback) {
                httpService.removeMasterDataValue(key, value).then(
                    resp => {
                        callback(resp);
                    }
                );
            },
            updateMasterDataValue: function (key, previousValue, newValue, callback) {
                httpService.updateMasterDataValue(key, previousValue, newValue).then(
                    resp => {
                        callback(resp);
                    }
                );
            }
        }
    }
]);
