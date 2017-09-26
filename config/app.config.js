var APP = angular.module('sample');

APP.run(function ($rootScope, $location, sessionService, userService) {
  $rootScope.logOut = function () {
    for (var prop in $rootScope) {
      if (prop.substring(0, 1) !== '$' && prop !== 'logOut' && prop !== 'changePasswordLoggedInUser') {
        delete $rootScope[prop];
      }
    }
    sessionService.clearUserSession();
    $location.path('/');
  }

  $rootScope.changePasswordLoggedInUser = function (password) {
    userService.changePassword({ "id": sessionService.getLoggedInUserData().id, "password": password }, function () {
      $("#changePassModal .close").click();
    });
  }

  $rootScope.loggedInUser = sessionService.getLoggedInUserData();
});

APP.factory('httpInterceptor', function ($q, $location, $rootScope, sessionService) {
  return {

    'request': function (config) {
      config.headers = config.headers || {};
      config.headers.Authorization = sessionService.getXAuthHeader();
      return config;
    },

    'response': function (response) {
      return response || $q.when(response);
    },

    'responseError': function (rejection) {
      console.log(rejection.status);
      $rootScope.globalError = rejection.status;
      $rootScope.lastFailedPath = $location.url();
      if ($location.url() != '/') {
        $location.path('/error');
      }
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
      }).
      when('/customerview', {
        template: '<customer-view></customer-view>'
      }).
      when('/error', {
        template: '<error></error>'
      });
  }
]);
