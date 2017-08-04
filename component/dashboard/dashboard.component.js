angular.
  module('sample').
  component('dashBoard', {
    templateUrl: './component/dashboard/dashboard.template.html',
    controller: ['$scope', '$timeout', '$location', 'sessionService', 'menuService',
      function dashBoardController($scope, $timeout, $location, sessionService, menuService) {
        //Better to construct options first and then pass it as a parameter
				var options = {
					title: {
						text: "Sales Chart"
					},
					animationEnabled: true,
					data: [
						{
							type: "column", //change it to line, area, bar, pie, etc
							dataPoints: [
								{ x: 10, y: 10 },
								{ x: 20, y: 11 },
								{ x: 30, y: 14 },
								{ x: 40, y: 16 },
								{ x: 50, y: 19 },
								{ x: 60, y: 15 },
								{ x: 70, y: 12 },
								{ x: 80, y: 10 }
							]
						}
					]
				};

				var chart = new CanvasJS.Chart("pieChartContainer",
					{
						title: {
							text: "Sales By Item"
						},
						animationEnabled: true,
						legend: {
							verticalAlign: "bottom",
							horizontalAlign: "center"
						},
						data: [
							{
								indexLabelFontSize: 20,
								indexLabelFontFamily: "Monospace",
								indexLabelFontColor: "darkgrey",
								indexLabelLineColor: "darkgrey",
								indexLabelPlacement: "outside",
								type: "pie",
								showInLegend: true,
								toolTipContent: "{y} - <strong>#percent%</strong>",
								dataPoints: [
									{ y: 4181563, legendText: "Item 1", indexLabel: "Item 1" },
									{ y: 2175498, legendText: "Item 2", indexLabel: "Item 2" },
									{ y: 3125844, legendText: "Item 3", exploded: true, indexLabel: "Item 3" },
									{ y: 1176121, legendText: "Item 4", indexLabel: "Item 4" },
									{ y: 1727161, legendText: "Item 5", indexLabel: "Item 5" },
									{ y: 4303364, legendText: "Item 6", indexLabel: "Item 6" },
									{ y: 1717786, legendText: "Item 7", indexLabel: "Item 7" }
								]
							}
						]
					});
				chart.render();
				$("#chartContainer").CanvasJSChart(options);
			}
    ]
  });
