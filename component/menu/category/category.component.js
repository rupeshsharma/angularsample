angular.
  module('sample').
  component('category', {
    templateUrl: './component/menu/category/category.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'menuService',
      function categoryController($scope, $timeout, $rootScope, $location, sessionService, menuService) {

        $scope.$on('categoryInit', function (event) {
          $scope.categoryInit();
        });

        $scope.categoryInit = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("categoryComponent").style.display = 'none';
          getAllCategories();
        }

        function getAllCategories() {
          menuService.getAllCategories(loadData);
        }

        let loadData = function (data) {
          $scope.categoryList = data;
          closeLoadingIndicator();
        }

        function closeLoadingIndicator() {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("categoryComponent").style.display = 'block';
        }

        $scope.addCategory = function () {
          if ($scope.newCategoryName && $scope.newCategoryName != '') {
            document.getElementById("loadingIndicator").style.display = 'block';
            document.getElementById("categoryComponent").style.display = 'none';

            menuService.addCategory({
              "title": $scope.newCategoryName
            }, function (data) {
              $scope.categoryList.push(data);
              $scope.newCategoryName = '';
              closeLoadingIndicator();
            });

          }
        }

        $scope.showUpdateCategoryModal = function (cat) {
          $scope.selectedCategory = cat;
        }

        $scope.updateCategory = function () {
          if ($scope.updatedCategoryName && $scope.updatedCategoryName != '') {
            document.getElementById("loadingIndicator").style.display = 'block';
            document.getElementById("categoryComponent").style.display = 'none';

            menuService.updateCategory({
              "id": $scope.selectedCategory.id,
              "title": $scope.updatedCategoryName
            }, function (data) {
              $scope.selectedCategory.title = data.title;
              $scope.selectedCategory.modifiedDate = data.modifiedDate;
              $scope.updatedCategoryName = '';
              $("#updateCatModal .close").click();
              closeLoadingIndicator();
            });

          }
        }

        $scope.showDeleteCategoryModal = function (cat) {
          $scope.selectedCategory = cat;
        }

        $scope.deleteCategory = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("categoryComponent").style.display = 'none';

          menuService.deleteCategory($scope.selectedCategory.id, function (data) {
            var index = $scope.categoryList.indexOf($scope.selectedCategory);
            $scope.categoryList.splice(index, 1);
            $("#deleteCatModal .close").click();
            closeLoadingIndicator();
          });

        }
      }
    ]
  });
