angular.
  module('sample').
  component('dashBoard', {
    templateUrl: './component/dashboard/dashboard.template.html',
    controller: ['$scope', '$rootScope', '$filter', '$timeout', '$location', 'sessionService', 'menuService', 'dashboardService',
      function dashBoardController($scope, $rootScope, $filter, $timeout, $location, sessionService, menuService, dashboardService) {

        function closeLoadingIndicator() {
          document.getElementById("loadingIndicator").style.display = 'none';
          document.getElementById("dashBoardComponent").style.display = 'block';
        }
        $scope.reviewDate = $filter('date')(new Date(), "dd-MM-yyyy");
        dashboardService.getReviewByDate($scope.reviewDate, data => {
          $scope.dailyReviewData = data;
          closeLoadingIndicator();
        });

        $scope.onTabClick = function (tabClicked) {
          $scope.$broadcast(tabClicked);
        }

        $rootScope.viewType = 'dashboard';

        $rootScope.viewButtonClicked = function () {
          console.log('dashboard wala wala');
        }
        $rootScope.close = function () {
          $location.path('/checkin');
          delete $rootScope.viewType;
          delete $rootScope.viewButtonClicked;
        }

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


        $("#reviewDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            document.getElementById("reviewDataSectionLoadingIndicator").style.display = 'block';
            document.getElementById("reviewDataSection").style.display = 'none';
            $scope.reviewDate = date;

            dashboardService.getReviewByDate($scope.reviewDate, data => {
              $scope.dailyReviewData = data;
              document.getElementById("reviewDataSectionLoadingIndicator").style.display = 'none';
              document.getElementById("reviewDataSection").style.display = 'block';
            });

          }
        });

        $("#fromOrderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            $scope.fromOrderDate = date;
          }
        });
        $("#toOrderDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            $scope.toOrderDate = date;
          }
        });
        $("#fromItemDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            $scope.fromItemDate = date;
          }
        });
        $("#toItemDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            $scope.toItemDate = date;
          }
        });
        $("#fromExpnsDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            $scope.fromExpnsDate = date;
          }
        });
        $("#toExpnsDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            $scope.toExpnsDate = date;
          }
        });
        $("#fromCollectionDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            $scope.fromCollectionDate = date;
          }
        });
        $("#toCollectionDate").datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          maxDate: 0,
          onSelect: function (date) {
            $scope.toCollectionDate = date;
          }
        });

        $scope.showTotalOrderInRange = function () {
          if ($scope.fromOrderDate != undefined && $scope.fromOrderDate != '' && $scope.toOrderDate != undefined && $scope.toOrderDate != '') {
            if ($scope.fromOrderDate > $scope.toOrderDate) {
              alert('From date cannot be greater than To date')
            } else {
              dashboardService.getTotalOrderInRange($scope.fromOrderDate, $scope.toOrderDate, data => {
                $scope.totalOrderPlacedInRange = data;
              });
            }
          }

        }

        $scope.showTotalItemInRange = function () {
          if ($scope.fromItemDate != undefined && $scope.fromItemDate != '' && $scope.toItemDate != undefined && $scope.toItemDate != '') {
            if ($scope.fromItemDate > $scope.toItemDate) {
              alert('From date cannot be greater than To date')
            } else {
              dashboardService.getTotalItemInRange($scope.fromItemDate, $scope.toItemDate, data => {
                $scope.totalItemSoldInRange = data;
              });
            }
          }

        }

        $scope.showTotalExpenseInRange = function () {
          if ($scope.fromExpnsDate != undefined && $scope.fromExpnsDate != '' && $scope.toExpnsDate != undefined && $scope.toExpnsDate != '') {
            if ($scope.fromExpnsDate > $scope.toExpnsDate) {
              alert('From date cannot be greater than To date')
            } else {
              dashboardService.getTotalExpenseInRange($scope.fromExpnsDate, $scope.toExpnsDate, data => {
                $scope.totalExpenseInRange = data;
              });
            }
          }

        }

        $scope.showTotalCollectionInRange = function () {
          if ($scope.fromCollectionDate != undefined && $scope.fromCollectionDate != '' && $scope.toCollectionDate != undefined && $scope.toCollectionDate != '') {
            if ($scope.fromCollectionDate > $scope.toCollectionDate) {
              alert('From date cannot be greater than To date')
            } else {
              dashboardService.getTotalCollectionInRange($scope.fromCollectionDate, $scope.toCollectionDate, data => {
                $scope.totalCollectionInRange = data;
              });
            }
          }

        }
      }
    ]
  });
