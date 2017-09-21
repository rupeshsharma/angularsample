var APP = angular.module('sample');

APP.run(function ($rootScope, $location, sessionService) {
  $rootScope.logOut = function () {
    for (var prop in $rootScope) {
      if (prop.substring(0, 1) !== '$' && prop !== 'logOut' && prop !== 'changePasswordLoggedInUser') {
        delete $rootScope[prop];
      }
    }
    sessionService.clearUserSession();
    $location.path('/');
  }
  
  $rootScope.changePasswordLoggedInUser = function(password){
    console.log(password);
  }
  
  $rootScope.loggedInUser = sessionService.getLoggedInUserData();
});

APP.factory('httpInterceptor', function ($q, $location, $rootScope) {
  return {

    'response': function (response) {
      return response || $q.when(response);
    },

    'responseError': function (rejection) {
      $rootScope.globalError = rejection.status;
      $rootScope.lastFailedPath = $location.url();
      $location.path('/error');
      return $q.reject(rejection);
    }

  };
});

APP.config(['$locationProvider', '$routeProvider', '$httpProvider',
  function config($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push('httpInterceptor');
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
