angular.
  module('sample').
  component('menuCart', {
    templateUrl: './component/menu/menu.template.html',
    controller: ['$scope', '$rootScope', '$timeout', '$location', 'sessionService', 'menuService', 'userService',
      function menuCartController($scope, $rootScope, $timeout, $location, sessionService, menuService, userService) {
        $timeout(function () {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("menuComponent").style.display = 'block';
        }, 500);

        $rootScope.viewType = 'menu';
        $scope.discount = 0;
        getUserData(sessionService, $timeout);
        $rootScope.isAnonymousCustomer = sessionService.isAnonymousCustomer();

        $scope.paymentTypes = [
          "Cash",
          "Card"
        ];
        $scope.diningModes = [
          "Take Away",
          "Dine In"
        ];
        setUpMenu(menuService);
        $scope.cart = {
          "quantity": 0,
          "items": [],
          "total": 0,
          "cgst": 0,
          "sgst": 0,
          "finalPrice": 0,
          "afterDiscount": 0
        };
        $rootScope.clearSession = function () {
          sessionService.clearUserSession();
          $location.path('/checkin');
          delete $rootScope.viewType;
          delete $rootScope.viewButtonClicked;
          delete $rootScope.customerMobile;
          delete $rootScope.customerName;
          delete $rootScope.isAnonymousCustomer;

        }

        $rootScope.viewButtonClicked = function () {
          console.log('menu wala');
        }

        $rootScope.updateCustomer = function (customerName, customerMobile) {
          document.getElementById("menuCustomerDataDiv").style.display = 'none';
          document.getElementById("menuCustomerDataLoadingIndicator").style.display = 'block';
          var userData = sessionService.getUserData()
          userService.updateCustomer(
            {
              "id": userData.id,
              "name": customerName,
              "mobile": customerMobile
            }, function (data) {
              sessionService.setUserData(data);
              document.getElementById("menuCustomerDataDiv").style.display = 'block';
              document.getElementById("menuCustomerDataLoadingIndicator").style.display = 'none';
            });
        }

        function setUpMenu(menuService) {
          menuService.getMenu(resp => {
            $scope.menu = resp;
          })
        }

        function getUserData() {
            var userData = sessionService.getUserData();
            $rootScope.customerMobile = userData.mobile;
            $rootScope.customerName = userData.name;
        }

        $scope.addToCart = function (item) {
          if ($scope.cart.items.indexOf(item) !== -1) {
            var quantity = $scope.cart.items[$scope.cart.items.indexOf(item)].quantity;
            $scope.cart.items[$scope.cart.items.indexOf(item)].quantity = quantity + 1;
            $scope.cart.quantity = $scope.cart.quantity + 1;

          } else {
            item.quantity = 1;
            $scope.cart.items.push(item);
            $scope.cart.quantity = $scope.cart.quantity + 1;

          }
          $scope.cart.total = $scope.cart.total + parseInt(item.price);
          if ($scope.discount != undefined && $scope.discount != "" && $scope.discount != "undefined") {
            $scope.cart.afterDiscount = $scope.cart.total - (($scope.cart.total / 100) * $scope.discount);
            $scope.cart.cgst = ($scope.cart.afterDiscount / 100) * 6;
            $scope.cart.sgst = ($scope.cart.afterDiscount / 100) * 6;
            $scope.cart.finalPrice = $scope.cart.afterDiscount + $scope.cart.cgst + $scope.cart.sgst;
          } else {
            $scope.cart.cgst = ($scope.cart.total / 100) * 6;
            $scope.cart.sgst = ($scope.cart.total / 100) * 6;
            $scope.cart.finalPrice = $scope.cart.total + $scope.cart.cgst + $scope.cart.sgst;
          }
        }

        $scope.updateDiscount = function (discount) {
          if (discount != undefined && discount != "" && discount != "undefined") {
            $scope.discount = discount;
            $scope.cart.afterDiscount = $scope.cart.total - (($scope.cart.total / 100) * $scope.discount);
            $scope.cart.cgst = ($scope.cart.afterDiscount / 100) * 6;
            $scope.cart.sgst = ($scope.cart.afterDiscount / 100) * 6;
            $scope.cart.finalPrice = $scope.cart.afterDiscount + $scope.cart.cgst + $scope.cart.sgst;
          } else {
            $scope.discount = 0;
            $scope.cart.cgst = ($scope.cart.total / 100) * 6;
            $scope.cart.sgst = ($scope.cart.total / 100) * 6;
            $scope.cart.finalPrice = $scope.cart.total + $scope.cart.cgst + $scope.cart.sgst;
          }

        }

        $scope.removeFromCart = function (item) {
          console.log(item);
          var index = $scope.cart.items.indexOf(item);
          var itm = $scope.cart.items[index];
          $scope.cart.quantity = $scope.cart.quantity - itm.quantity;

          $scope.cart.total = $scope.cart.total - (parseInt(item.price) * parseInt(item.quantity));
          if ($scope.discount != undefined && $scope.discount != "" && $scope.discount != "undefined") {
            $scope.cart.afterDiscount = $scope.cart.total - (($scope.cart.total / 100) * $scope.discount);
            $scope.cart.cgst = ($scope.cart.afterDiscount / 100) * 6;
            $scope.cart.sgst = ($scope.cart.afterDiscount / 100) * 6;
            $scope.cart.finalPrice = $scope.cart.afterDiscount + $scope.cart.cgst + $scope.cart.sgst;
          } else {
            $scope.cart.cgst = ($scope.cart.total / 100) * 6;
            $scope.cart.sgst = ($scope.cart.total / 100) * 6;
            $scope.cart.finalPrice = $scope.cart.total + $scope.cart.cgst + $scope.cart.sgst;
          }
          $scope.cart.items.splice(index, 1);
        }

        $scope.updateCartItem = function (item, actionType) {
          var index = $scope.cart.items.indexOf(item);
          if (actionType == 0) {
            $scope.cart.items[index].quantity = $scope.cart.items[index].quantity - 1;
            $scope.cart.quantity = $scope.cart.quantity - 1;

            $scope.cart.total = $scope.cart.total - parseInt(item.price);
          } else {
            $scope.cart.items[index].quantity = $scope.cart.items[index].quantity + 1;
            $scope.cart.quantity = $scope.cart.quantity + 1;

            $scope.cart.total = $scope.cart.total + parseInt(item.price);
          }
          if ($scope.discount != undefined && $scope.discount != "" && $scope.discount != "undefined") {
            $scope.cart.afterDiscount = $scope.cart.total - (($scope.cart.total / 100) * $scope.discount);
            $scope.cart.cgst = ($scope.cart.afterDiscount / 100) * 6;
            $scope.cart.sgst = ($scope.cart.afterDiscount / 100) * 6;
            $scope.cart.finalPrice = $scope.cart.afterDiscount + $scope.cart.cgst + $scope.cart.sgst;
          } else {
            $scope.cart.cgst = ($scope.cart.total / 100) * 6;
            $scope.cart.sgst = ($scope.cart.total / 100) * 6;
            $scope.cart.finalPrice = $scope.cart.total + $scope.cart.cgst + $scope.cart.sgst;
          }
        }

        $scope.buildOrder = function () {
          var index;
          var orderDetailList = [];

          for (index = 0; index < $scope.cart.items.length; ++index) {
            var orderDetail = {
              "item": $scope.cart.items[index],
              "quantity": $scope.cart.items[index].quantity,
              "unitPrice": $scope.cart.items[index].price
            }
            orderDetailList.push(orderDetail);
          }

          var request = {
            "amount": $scope.cart.finalPrice,
            "customer": sessionService.getUserData(),
            "orderDetail": orderDetailList
          }
          menuService.buildOrder(request, function () {
            $rootScope.clearSession();
          });
          $("#myModal .close").click();

          //printing invoice
          document.getElementById("printInvoice").click();
        }

        $scope.ptChange = function (paymentType) {
          $scope.paymentType = paymentType;
        }

        $scope.dmChange = function (diningMode) {
          $scope.diningMode = diningMode;
        }

        $scope.getCurrentDate = function () {
          return (new Date());
        }
      }
    ]
  });
