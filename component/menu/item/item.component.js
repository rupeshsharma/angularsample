angular.
  module('sample').
  component('item', {
    templateUrl: './component/menu/item/item.template.html',
    controller: ['$scope', '$timeout', '$rootScope', '$location', 'sessionService', 'menuService', 'dashboardService',
      function itemController($scope, $timeout, $rootScope, $location, sessionService, menuService, dashboardService) {
        $scope.itemData = {};
        $scope.$on('itemInit', function (event) {
          $scope.itemInit();
        });

        $scope.itemInit = function () {
          document.getElementById("loadingIndicator").style.display = 'block';
          document.getElementById("itemComponent").style.display = 'none';
          getAllCategories();
          $scope.month = {
            "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
          };
          $scope.year = [2017];
        }

        $scope.mnChange = function (data) {
          $scope.selectedMonth = data;
        }

        $scope.yrChange = function (data) {
          $scope.selectedYear = data;
        }

        $scope.generateChart = function (id) {
          document.getElementById("perItemChart").style.display = 'block';
          $scope.chart = new CanvasJS.Chart("perItemChart", {
            title: {
              text: ""
            },
            data: [
              {
                type: "line",
                dataPoints: [
                ]
              }
            ]
          });
          var request = {
            "renderChartBy": $scope.renderChartBy,
            "year": $scope.selectedYear,
            "month": $scope.selectedMonth
          };

          dashboardService.getPerItemChartData(request, id, data => {
            var chartTitle;
            if ($scope.renderChartBy == 'm') {
              chartTitle = "Monthly";
            } else if ($scope.renderChartBy == 'y') {
              chartTitle = "Yearly";
            } else {
              chartTitle = "Daily";
            }
            $scope.chart.options.data[0].dataPoints = data;
            $scope.chart.options.title.text = chartTitle;
            $scope.chart.render();
          });
        }

        $scope.validateGenerateChart = function () {
          if ($scope.renderChartBy == undefined || $scope.renderChartBy == '') {
            return true;
          } else {
            if ($scope.renderChartBy == 'd' && ($scope.selectedMonth == undefined || $scope.selectedMonth == '' || $scope.selectedYear == undefined || $scope.selectedYear == '')) {
              return true;
            } else if ($scope.renderChartBy == 'm' && ($scope.selectedYear == undefined || $scope.selectedYear == '')) {
              return true;
            }
          }
          return false;
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

        $scope.filterWholeItemGraph = function () {
          menuService.showWholeItemGraphInRange($scope.fromItemSaleGraphDate, $scope.toItemSaleGraphDate, data => {
            $scope.wholeItemChart.options.data[0].dataPoints = data;
            $scope.wholeItemChart.render();
          });
        }

        $("#fromItemSaleGraphDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            $scope.fromItemSaleGraphDate = date;
          }
        });

        $("#toItemSaleGraphDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            $scope.toItemSaleGraphDate = date;
          }
        });

        $scope.updateChart = function (updateBy) {
          $scope.renderChartBy = updateBy;
        }

        $scope.viewitemDetail = function (item) {
          document.getElementById("perItemChart").style.display = 'none';
          $scope.selectedMonth = undefined;
          $scope.selectedYear = undefined;
          if ($scope.renderChartBy == 'd') {
            document.getElementById("dailyChartView").classList.remove("active");
          } else if ($scope.renderChartBy == 'm') {
            document.getElementById("monthlyChartView").classList.remove("active");
          } else if ($scope.renderChartBy == 'y') {
            document.getElementById("yearlyChartView").classList.remove("active");
          }
          $scope.renderChartBy = undefined;
          $scope.viewedItem = item;
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
