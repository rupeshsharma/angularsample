angular.
  module('sample').
  component('item', {
    templateUrl: './component/menu/item/item.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'menuService',
      function itemController($scope, $timeout, $rootScope, $location, sessionService, menuService) {
        $scope.itemData = {};
        $scope.$on('itemInit', function (event) {
          $scope.itemInit();
        });

        $scope.itemInit = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("itemComponent").style.display = 'none';
          getAllCategories();
        }

        function getAllCategories() {
          menuService.getAllCategories(loadCategoryData);
        }

        let loadCategoryData = function (data) {
          $scope.categoryList = data;
          closeLoadingIndicator();
        }

        function closeLoadingIndicator() {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("itemComponent").style.display = 'block';
        }


        $scope.itemList = [];

        $('.close').click(function () {
          $scope.itemData = {};
        });


        $scope.displayItemsForCategory = function (categorySelected) {
          if ($scope.categorySelected && $scope.categorySelected != '') {
            document.getElementById("loadingIndicator").style.display = 'block';
            document.getElementById("itemComponent").style.display = 'none';
            menuService.getItemsForCategory(categorySelected.id, function (data) {
              $scope.itemList = data;
              closeLoadingIndicator();
            });
          } else {
            $scope.itemList = [];
          }
        }

        $scope.addItem = function () {
          if ($scope.itemData.title != '' && $scope.itemData.price != '') {
            document.getElementById("loadingIndicator").style.display = 'block';
            document.getElementById("itemComponent").style.display = 'none';
            $scope.itemData.category = $scope.categorySelected.id;
            menuService.addItemInCategory(
              $scope.itemData, function (data) {
                $scope.itemList.push(data);
                $scope.itemData = {};
                $("#newItemModal .close").click()
                closeLoadingIndicator();
              }
            );

          }

        }

        $scope.updateItem = function () {
          if ($scope.itemData.title != '' && $scope.itemData.price != '') {
            document.getElementById("loadingIndicator").style.display = 'block';
            document.getElementById("itemComponent").style.display = 'none';
            menuService.updateItemInCategory(
              $scope.itemData, function (data) {
                $scope.selectedItem.title = data.title;
                $scope.selectedItem.type = data.type;
                $scope.selectedItem.price = data.price;
                $scope.selectedItem.description = data.description;
                $scope.selectedItem.modifiedDate = data.modifiedDate;
                $scope.itemData = {};
                $("#updateItemModal .close").click()
                closeLoadingIndicator();
              }
            );
          }

        }

        $scope.showUpdateItemModal = function (item) {
          $scope.selectedItem = item;
          $scope.itemData.title = item.title;
          $scope.itemData.type = item.type
          $scope.itemData.price = item.price;
          $scope.itemData.description = item.description;
          $scope.itemData.id = item.id;
          $scope.itemData.category = item.category;
        }

        $scope.showDeleteItemModal = function (item) {
          $scope.selectedItem = item;
        }

        $scope.deleteItem = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("itemComponent").style.display = 'none';

          menuService.deleteItem($scope.selectedItem.id, function (data) {
            var index = $scope.itemList.indexOf($scope.selectedItem);
            $scope.itemList.splice(index, 1);
            $("#deleteItemModal .close").click()
            closeLoadingIndicator();
          });
        }

        $scope.chart = new CanvasJS.Chart("perItemChart", {
          title: {
            text: "Weekly"
          },
          data: [
            {
              type: "line",
              dataPoints: [
                { label: "10/7/2017", y: 10 },
                { label: "17/7/2017", y: 15 },
                { label: "24/7/2017", y: 25 },
                { label: "31/7/2017", y: 30 },
                { label: "7/8/2017", y: 28 }
              ]
            }
          ]
        });
        $scope.updateChart = function (updateBy) {
          $scope.renderChartBy = updateBy;
          if (updateBy == 'm') {
            $scope.chart.options.title.text = "Monthly";
            $scope.chart.options.data[0].dataPoints = [
              { label: "Jan", y: 10 },
              { label: "Feb", y: 15 },
              { label: "Mar", y: 25 },
              { label: "Apr", y: 30 },
              { label: "May", y: 28 },
              { label: "Jun", y: 28 },
              { label: "Jul", y: 50 },
              { label: "Aug", y: 28 },
              { label: "Sep", y: 60 },
              { label: "Oct", y: 28 },
              { label: "Nov", y: 28 },
              { label: "Dec", y: 100 }
            ];
          } else if (updateBy == 'y') {
            $scope.chart.options.title.text = "Yearly";
            $scope.chart.options.data[0].dataPoints = [
              { label: "2014", y: 10 },
              { label: "2015", y: 15 },
              { label: "2016", y: 25 },
              { label: "2017", y: 30 },
              { label: "2018", y: 28 }
            ];
          } else {
            $scope.chart.options.title.text = "Weekly";
            $scope.chart.options.data[0].dataPoints = [
              { label: "10/7/2017", y: 10 },
              { label: "17/7/2017", y: 15 },
              { label: "24/7/2017", y: 25 },
              { label: "31/7/2017", y: 30 },
              { label: "7/8/2017", y: 28 }
            ];
          }
          $scope.chart.render();
        }

        $scope.viewitemDetail = function (item) {
          $scope.viewedItem = item;
          $scope.updateChart('w');
        }

        $scope.showWholeItemGraph = function () {
          menuService.getWholeItemGraph(data => {
            $scope.wholeItemChart = new CanvasJS.Chart("wholeItemChartContainer", {
              animationEnabled: true,
              axisX: {
                interval: 1,
                gridThickness: 0,
                labelFontSize: 10,
                labelFontStyle: "normal",
                labelFontWeight: "normal",
                labelFontFamily: "Lucida Sans Unicode"

              },
              axisY2: {
                interlacedColor: "rgba(1,77,101,.2)",
                gridColor: "rgba(1,77,101,.1)"

              },

              data: [
                {
                  type: "bar",
                  name: "Items",
                  axisYType: "secondary",
                  color: "#014D65",
                  dataPoints: [
                  ]
                }

              ]
            });
            $scope.wholeItemChart.options.data[0].dataPoints = data;
            $scope.wholeItemChart.render();
          });
        }


      }
    ]
  });
