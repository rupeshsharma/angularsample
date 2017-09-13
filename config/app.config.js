var APP = angular.module('sample');

APP.run(function ($rootScope, $location, sessionService) {
  $rootScope.logOut = function () {
    for (var prop in $rootScope) {
      if (prop.substring(0, 1) !== '$') {
        delete $rootScope[prop];
      }
    }
    sessionService.clearUserSession();
    $location.path('/');
  }
});

APP.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when('/', {
        template: '<log-in></log-in>'
      }).
      when('/checkin', {
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
