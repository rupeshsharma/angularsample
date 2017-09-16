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

        $scope.masterData = {
          "chartType": ["Revenue", "Sales"],
          "month": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          "year": ["2017"]
        };

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

        $scope.validateGenerateChart = function () {
          if ($scope.renderChartBy == undefined || $scope.renderChartBy == '' || $scope.chartType == undefined || $scope.chartType == '') {
            return true;
          } else {
            if ($scope.renderChartBy == 'd' && ($scope.selectedMonth == undefined || $scope.selectedMonth == '' || $scope.selectedYear == undefined || $scope.selectedYear == '')) {
              return true;
            }else if($scope.renderChartBy == 'm' && ($scope.selectedYear == undefined || $scope.selectedYear == '')){
              return true;
            }
            return false;
          }
        }

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

        $scope.ctChange = function (data) {
          $scope.chartType = data;
        }

        $scope.mnChange = function (data) {
          $scope.selectedMonth = data;
        }

        $scope.yrChange = function (data) {
          $scope.selectedYear = data;
        }

        $scope.updateRenderChartBy = function (data) {
          $scope.renderChartBy = data;
        }

        $scope.generateChart = function () {
          document.getElementById("ct-visits").style.display = 'block';
          $scope.chart = new CanvasJS.Chart("ct-visits", {
            title: {
              text: ""
            },
            data: [
              {
                type: "column",
                dataPoints: [
                ]
              },
              {
                type: "line",
                dataPoints: [
                ]
              }
            ]
          });
          var request = {
            "chartType": $scope.chartType,
            "renderChartBy": $scope.renderChartBy,
            "year": $scope.selectedYear,
            "month": $scope.selectedMonth
          };

          dashboardService.getChartData(request, data => {
            var chartTitle;
            if ($scope.renderChartBy == 'm') {
              chartTitle = "Monthly";
            } else if ($scope.renderChartBy == 'y') {
              chartTitle = "Yearly";
            } else {
              chartTitle = "Daily";
            }
            $scope.chart.options.data[0].dataPoints = data.data1;
            $scope.chart.options.data[1].dataPoints = data.data2;
            $scope.chart.options.title.text = chartTitle;
            $scope.chart.render();
          });

        }
      }
    ]
  });
