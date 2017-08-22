angular.
  module('sample').
  component('category', {
    templateUrl: './component/menu/category/category.template.html',
    controller: ['$scope', '$rootScope', '$location', 'sessionService', 'menuService',
      function categoryController($scope, $rootScope, $location, sessionService, menuService) {
        setUpMenu(menuService);

        $scope.$on('categoryInit', function (event) {
           $scope.categoryInit();
        });

        $scope.categoryInit = function () {
          console.debug("Category INIT");
        }

        function setUpMenu(menuService) {
          menuService.getMenu(resp => {
            $scope.menu = resp;
          })
        }

        $scope.addCategory = function () {
          if ($scope.newCategoryName && $scope.newCategoryName != '') {
            var category = {
              "title": $scope.newCategoryName
            }
            $scope.menu.push(category);
            $scope.newCategoryName = '';
          }
        }

        $scope.updateCategryValue = function (cat) {
          $scope.updatedCategoryName = cat.title;
        }
      }
    ]
  });
