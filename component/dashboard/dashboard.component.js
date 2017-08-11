angular.
  module('sample').
  component('dashBoard', {
    templateUrl: './component/dashboard/dashboard.template.html',
    controller: ['$scope', '$filter', '$timeout', '$location', 'sessionService', 'menuService',
      function dashBoardController($scope, $filter, $timeout, $location, sessionService, menuService) {
        $scope.chart = new CanvasJS.Chart("ct-visits", {
          title: {
            text: "Adding & Updating dataPoints"
          },
          data: [
            {
              // Change type to "doughnut", "line", "splineArea", etc.
              type: "column",
              dataPoints: [
                { label: "1/7/2017", y: 10 },
                { label: "8/7/2017", y: 15 },
                { label: "15/7/2017", y: 25 },
                { label: "21/7/2017", y: 30 },
                { label: "28/8/2017", y: 28 }
              ]
            },
            {
              // Change type to "doughnut", "line", "splineArea", etc.
              type: "line",
              dataPoints: [
                { label: "1/7/2017", y: 11 },
                { label: "8/7/2017", y: 14 },
                { label: "15/7/2017", y: 29 },
                { label: "21/7/2017", y: 40 },
                { label: "28/8/2017", y: 58 }
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
            $scope.chart.options.data[1].dataPoints = [
              { label: "Jan", y: 16 },
              { label: "Feb", y: 14 },
              { label: "Mar", y: 25 },
              { label: "Apr", y: 30 },
              { label: "May", y: 28 },
              { label: "Jun", y: 28 },
              { label: "Jul", y: 57 },
              { label: "Aug", y: 18 },
              { label: "Sep", y: 60 },
              { label: "Oct", y: 68 },
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
            $scope.chart.options.data[1].dataPoints = [
              { label: "2014", y: 10 },
              { label: "2015", y: 15 },
              { label: "2016", y: 25 },
              { label: "2017", y: 30 },
              { label: "2018", y: 28 }
            ];
          } else {
            $scope.chart.options.title.text = "Weekly";
            $scope.chart.options.data[0].dataPoints = [
              { label: "1/7/2017", y: 10 },
              { label: "8/7/2017", y: 15 },
              { label: "15/7/2017", y: 25 },
              { label: "21/7/2017", y: 30 },
              { label: "28/8/2017", y: 28 }
            ];
            $scope.chart.options.data[1].dataPoints = [
              { label: "1/7/2017", y: 11 },
              { label: "8/7/2017", y: 14 },
              { label: "15/7/2017", y: 29 },
              { label: "21/7/2017", y: 40 },
              { label: "28/8/2017", y: 58 }
            ];
          }
          $scope.chart.render();
        }

        $scope.updateChart('w');

        $scope.reviewDate = $filter('date')(new Date(), "dd-MM-yyyy");
        $("#reviewDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#orderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#fromOrderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#toOrderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#itemDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#fromItemDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#toItemDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#collectionDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#fromCollectionDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
        $("#toCollectionDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy"
        });
      }
    ]
  });
