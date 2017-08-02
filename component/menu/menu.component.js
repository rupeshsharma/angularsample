angular.
  module('sample').
  component('menu', {
    templateUrl: './component/menu/menu.template.html',
    controller: ['$scope', '$timeout', '$location','sessionService','menuService',
      function menuController($scope, $timeout, $location, sessionService, menuService) {
        $scope.isAnonymousCustomer = sessionService.isAnonymousCustomer();
        getUserData(sessionService, $timeout);
        setUpMenu(menuService);
        $scope.cart = {
          "quantity":0,
          "items" : [],
          "total" : 0,
          "cgst" : 0,
          "sgst" : 0,
          "finalPrice" : 0
        };
        $scope.clearSession = function(){
          sessionService.clearUserSession();
          $location.path('/');
        }

        function setUpMenu(menuService, $timeout){
          menuService.getMenu(resp => {
            $scope.menu = resp;
          })
        }

        function getUserData(sessionService){
          $timeout(function () {
            var userData = sessionService.getUserData();
            $scope.mobile = userData.mobile;
            $scope.name = userData.name;
          }, 500);
        }

        $scope.addToCart = function(item){
          if($scope.cart.items.indexOf(item) !== -1){
            var quantity = $scope.cart.items[$scope.cart.items.indexOf(item)].quantity;
            $scope.cart.items[$scope.cart.items.indexOf(item)].quantity = quantity + 1;
            $scope.cart.quantity = $scope.cart.quantity + 1;
          }else{
            item.quantity = 1;
            $scope.cart.items.push(item);
            $scope.cart.quantity = $scope.cart.quantity + 1;
          }
          $scope.cart.total = $scope.cart.total + parseInt(item.itemPrice);
          $scope.cart.cgst = ($scope.cart.total / 100)*6;
          $scope.cart.sgst = ($scope.cart.total / 100)*6;
          $scope.cart.finalPrice = $scope.cart.total + $scope.cart.cgst + $scope.cart.sgst;
        }

        $scope.removeFromCart = function (item){
          console.log(item);
          var index = $scope.cart.items.indexOf(item);
          var itm = $scope.cart.items[index];
          $scope.cart.quantity = $scope.cart.quantity - itm.quantity;
          $scope.cart.total = $scope.cart.total - (parseInt(item.itemPrice) * parseInt(item.quantity));
          $scope.cart.cgst = ($scope.cart.total / 100)*6;
          $scope.cart.sgst = ($scope.cart.total / 100)*6;
          $scope.cart.finalPrice = $scope.cart.total + $scope.cart.cgst + $scope.cart.sgst;
          $scope.cart.items.splice(index, 1);
        }

        $scope.updateCartItem = function (item, actionType){
          var index = $scope.cart.items.indexOf(item);
          if(actionType == 0){
            $scope.cart.items[index].quantity = $scope.cart.items[index].quantity - 1;
            $scope.cart.quantity = $scope.cart.quantity - 1;
            $scope.cart.total = $scope.cart.total - parseInt(item.itemPrice);
          }else{
            $scope.cart.items[index].quantity = $scope.cart.items[index].quantity + 1;
            $scope.cart.quantity = $scope.cart.quantity + 1;
            $scope.cart.total = $scope.cart.total + parseInt(item.itemPrice);
          }
          $scope.cart.cgst = ($scope.cart.total / 100)*6;
          $scope.cart.sgst = ($scope.cart.total / 100)*6;
          $scope.cart.finalPrice = $scope.cart.total + $scope.cart.cgst + $scope.cart.sgst;
        }
      }
    ]
  });
