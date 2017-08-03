angular.
  module('sample').
  component('item', {
    templateUrl: './component/menu/item/item.template.html',
    controller: ['$scope','$location','sessionService','menuService',
      function itemController($scope, $location, sessionService, menuService) {
        setUpMenu(menuService);
        $scope.itemList = [];

        function setUpMenu(menuService){
          menuService.getMenu(resp => {
            $scope.menu = resp;
          })
        }

        $scope.displayItemsForCategory = function(categorySelected){
          if($scope.categorySelected && $scope.categorySelected!=''){
          $scope.itemList = $scope.menu[$scope.menu.indexOf($scope.categorySelected)].items;
          }else{
            $scope.itemList = [];
          }
        }

        $scope.addItem =function(){
          if($scope.newItemName != '' && $scope.newItemPrice != ''){
            var newItem = {
            "itemName" : $scope.newItemName,
            "itemPrice": $scope.newItemPrice
            }
            $scope.menu[$scope.menu.indexOf($scope.categorySelected)].items.push(newItem);
            $scope.itemList = $scope.menu[$scope.menu.indexOf($scope.categorySelected)].items;
            $scope.newItemName = '';
            $scope.newItemPrice = '';
          }
           $("#myModal .close").click()
        }
       
      }
    ]
  });
