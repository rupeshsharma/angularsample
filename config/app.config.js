var APP = angular.module('sample')

APP.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          template: '<check-in></check-in>'
        }).
        when('/menu', {
          template: '<menu></menu>'
        });
    }
  ]);