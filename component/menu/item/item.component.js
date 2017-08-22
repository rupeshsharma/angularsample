angular.
  module('sample').
  component('item', {
    templateUrl: './component/menu/item/item.template.html',
    controller: ['$scope', '$rootScope', '$location', 'sessionService', 'menuService',
      function itemController($scope, $rootScope, $location, sessionService, menuService) {

        $scope.$on('itemInit', function (event) {
           $scope.itemInit();
        });

         $scope.itemInit = function () {
          console.debug("Item INIT");
        }

        setUpMenu(menuService);
        $scope.itemList = [];
        function setUpMenu(menuService) {
          menuService.getMenu(resp => {
            $scope.menu = resp;
          })
        }

        $scope.displayItemsForCategory = function (categorySelected) {
          if ($scope.categorySelected && $scope.categorySelected != '') {
            $scope.itemList = $scope.menu[$scope.menu.indexOf($scope.categorySelected)].items;
          } else {
            $scope.itemList = [];
          }
        }

        $scope.addItem = function () {
          if ($scope.newItemName != '' && $scope.newItemPrice != '') {
            var newItem = {
              "title": $scope.newItemName,
              "price": $scope.newItemPrice
            }
            $scope.menu[$scope.menu.indexOf($scope.categorySelected)].items.push(newItem);
            $scope.itemList = $scope.menu[$scope.menu.indexOf($scope.categorySelected)].items;
            $scope.newItemName = '';
            $scope.newItemPrice = '';
          }
          $("#myModal .close").click()
        }

        $scope.updateItem = function () {
          if ($scope.newItemName != '' && $scope.newItemPrice != '') {
            var newItem = {
              "title": $scope.newItemName,
              "price": $scope.newItemPrice
            }
            $scope.menu[$scope.menu.indexOf($scope.categorySelected)].items.push(newItem);
            $scope.itemList = $scope.menu[$scope.menu.indexOf($scope.categorySelected)].items;
            $scope.newItemName = '';
            $scope.newItemPrice = '';
          }
          $("#myModal .close").click()
        }

        $scope.updateItemValue = function (item) {
          $scope.updatedItemName = item.title;
          $scope.updatedItemPrice = item.price;
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
              name: "companies",
              axisYType: "secondary",
              color: "#014D65",
              dataPoints: [

                { y: 5, label: "Sweden" },
                { y: 6, label: "Taiwan" },
                { y: 7, label: "Russia" },
                { y: 8, label: "Spain" },
                { y: 8, label: "Brazil" },
                { y: 8, label: "India" },
                { y: 9, label: "Italy" },
                { y: 9, label: "Australia" },
                { y: 12, label: "Canada" },
                { y: 13, label: "South Korea" },
                { y: 13, label: "Netherlands" },
                { y: 15, label: "Switzerland" },
                { y: 28, label: "Britain" },
                { y: 32, label: "Germany" },
                { y: 32, label: "France" },
                { y: 68, label: "Japan" },
                { y: 73, label: "China" },
                { y: 132, label: "US" }
              ]
            }

          ]
        });
        $scope.showWholeItemGraph = function () {
          var itemList = [];
          var dataPoints = [];
          for (i = 0; i < $scope.menu.length; i++) {
            itemList = itemList.concat($scope.menu[i].items);
          }
          var newDataPoin = {};
          var min = Math.ceil(100);
          var max = Math.floor(500);
          for (i = 0; i < itemList.length; i++) {
            newDataPoint = {
              y: Math.floor(Math.random() * (max - min + 1)) + min,
              legendText: itemList[i].title,
              label: itemList[i].title
            }
            dataPoints.push(newDataPoint);
          }
          $scope.wholeItemChart.options.data[0].dataPoints = dataPoints;
          $scope.wholeItemChart.render();
        }


      }
    ]
  });
