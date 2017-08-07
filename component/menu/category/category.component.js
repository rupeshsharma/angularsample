angular.
  module('sample').
  component('category', {
    templateUrl: './component/menu/category/category.template.html',
    controller: ['$scope','$location','sessionService','menuService',
      function categoryController($scope, $location, sessionService, menuService) {
        setUpMenu(menuService);


        function setUpMenu(menuService){
          menuService.getMenu(resp => {
            $scope.menu = resp;
          })
        }

        $scope.addCategory = function(){
          if($scope.newCategoryName && $scope.newCategoryName !=''){
          var category = {
            "title" : $scope.newCategoryName
          }
          $scope.menu.push(category);
          $scope.newCategoryName = '';
        }
        }
      }
    ]
  });
