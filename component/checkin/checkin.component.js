angular.
  module('sample').
  component('checkIn', {
    templateUrl: './component/checkin/checkin.template.html',
    controller: ['$scope','$location','sessionService','userService',
      function checkInController($scope, $location, sessionService, userService) {

$('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

        $scope.checkIn = function(isAnonymous){
          if(!isAnonymous){
            sessionService.isAnonymousCustomer(false);
            userService.getUserByMobile($scope.mobile, resp => {
              sessionService.setUserData(resp);
            });
          }else{
            sessionService.setAnonymousCustomer(true);
          }
          $location.path('/menu');
        }

      }
    ]
  });
