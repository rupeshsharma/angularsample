var APP = angular.module('sample')

APP.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when('/', {
        template: '<check-in></check-in>'
      }).
      when('/menu', {
        template: '<menu-cart></menu-cart>'
      }).
      when('/dashboard', {
        template: '<dash-board></dash-board>'
      });
  }
]);
