angular.
  module('sample').
  component('menuCart', {
    templateUrl: './component/menu/menu.template.html',
    controller: ['$scope', '$rootScope', '$timeout', '$location', 'sessionService', 'menuService', 'customerService', '$localStorage',
      function menuCartController($scope, $rootScope, $timeout, $location, sessionService, menuService, customerService, $localStorage) {

        if (!sessionService.getLoggedInUserData()) {
          $location.path('/');
        } else {
          $rootScope.viewType = 'menu';
          $scope.discount = 0;
          getCustomerData();
          $scope.masterData = sessionService.getMasterData();
          setUpMenu();
          $scope.isOrderPlaced = (sessionService.getOrderDetail() != undefined) ? true : false;
        }
        
        function closeLoadingIndicator() {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("menuComponent").style.display = 'block';
        }

        $scope.cart = {
          "quantity": 0,
          "items": [],
          "total": 0,
          "cgst": 0,
          "sgst": 0,
          "finalPrice": 0,
          "afterDiscount": 0
        };
        $rootScope.clearCustomerSession = function () {
          sessionService.removeCustomerData();
          sessionService.removeOrderDetail();
          $localStorage.$reset();
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
          var userData = sessionService.getCustomerData();
          $rootScope.customerName = customerName;
          customerService.updateCustomer(
            {
              "id": userData.id,
              "name": customerName,
              "mobile": customerMobile
            }, function (data) {
              sessionService.setCustomerData(data);
              document.getElementById("menuCustomerDataDiv").style.display = 'block';
              document.getElementById("menuCustomerDataLoadingIndicator").style.display = 'none';
            });
        }

        function setUpMenu() {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("menuComponent").style.display = 'none';
          menuService.getMenu(resp => {
            $scope.menu = resp;
            closeLoadingIndicator();
          })
        }

        function getCustomerData() {
          var userData = sessionService.getCustomerData();
          if (userData) {
            $rootScope.customerMobile = userData.mobile;
            $rootScope.customerName = userData.name;
          }
          $rootScope.isAnonymousCustomer = sessionService.isAnonymousCustomer();
          $scope.isAnonymousCustomer = sessionService.isAnonymousCustomer();
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
        
        $localStorage.somedata = $scope.cart;
        $localStorage.customer = $rootScope.customerName;

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
          $localStorage.discount = $scope.discount;
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
              "item": { "id": $scope.cart.items[index].id },
              "quantity": $scope.cart.items[index].quantity,
              "unitPrice": $scope.cart.items[index].price
            }
            orderDetailList.push(orderDetail);
          }

          var customerData = {
            "id": 1
          }
          if (!sessionService.isAnonymousCustomer()) {
            customerData.id = sessionService.getCustomerData().id;
          }

          var request = {
            "total": $scope.cart.total,
            "customer": customerData,
            "paymentType": $scope.paymentType,
            "diningMode": $scope.diningMode,
            "orderFrom": $scope.orderFrom,
            "discount": $scope.discount,
            "orderDetail": orderDetailList,
            "afterDiscountTotal": ($scope.discount != 0 && $scope.discount != '') ? $scope.cart.afterDiscount : $scope.cart.total,
            "cgst": $scope.cart.cgst,
            "sgst": $scope.cart.sgst,
            "grandTotal": $scope.cart.finalPrice
          }

          // console.log(JSON.stringify(request))

          menuService.buildOrder(request, function (data) {
            sessionService.setOrderDetail({
              "orderNumber": data,
              "customerName": $rootScope.customerName,
              "customerAddress": $scope.customerAddress,
              "cart": $scope.cart,
              "paymentType" : $scope.paymentType,
              "diningMode" : $scope.diningMode,
              "discount": $scope.discount
            });
            $scope.isOrderPlaced = true;
            //printing invoice
            $("#myModal .close").click();
            if (!sessionService.isAnonymousCustomer()) {
              customerService.updateLastVisit(customerData.id);
            }
            $timeout(function () {
              document.getElementById("printInvoice").click();
            }, 50);
            // $timeout(function () {
            //   $rootScope.clearCustomerSession();
            // }, 100);
          });

        }

        $scope.ptChange = function (paymentType) {
          $scope.paymentType = paymentType;
        }

        $scope.dmChange = function (diningMode) {
          $scope.diningMode = diningMode;
        }
        
        $scope.ofChange = function (orderFrom) {
          $scope.orderFrom = orderFrom;
        }

        $scope.getCurrentDate = function () {
          return (new Date());
        }

        $scope.getOrderDetail = function () {
          return sessionService.getOrderDetail();
        }
        
        $scope.updateAddress = function (customerAddress) {
          $scope.customerAddress = customerAddress;
          document.getElementById("customerAddressLoadingIndicator").style.display = 'block';
          document.getElementById("customerAddressComponent").style.display = 'none';
          var customerData = {
            "id": sessionService.getCustomerData().id,
            "address": customerAddress
          }
          customerService.updateAddress(customerData, data => {
            document.getElementById("customerAddressLoadingIndicator").style.display = 'none';
            document.getElementById("customerAddressComponent").style.display = 'block';
          });

        }
      }
    ]
  });
