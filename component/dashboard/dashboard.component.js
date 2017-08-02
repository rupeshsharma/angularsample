angular.
  module('sample').
  component('dashBoard', {
    templateUrl: './component/dashboard/dashboard.template.html',
    controller: ['$scope', '$timeout', '$location','sessionService','menuService',
      function dashBoardController($scope, $timeout, $location, sessionService,menuService) {
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

  var optionSpline = {
		title: {
			text: "Sales Chart"
		},
                animationEnabled: true,
		data: [
		{
			type: "spline", //change it to line, area, column, pie, etc
			dataPoints: [
				{ x: 10, y: 10 },
				{ x: 20, y: 12 },
				{ x: 30, y: 8 },
				{ x: 40, y: 14 },
				{ x: 50, y: 6 },
				{ x: 60, y: 24 },
				{ x: 70, y: -4 },
				{ x: 80, y: 10 }
			]
		}
		]
	};

  var chart = new CanvasJS.Chart("pieChartContainer",
	{
		title:{
			text: "Sales By Item"
		},
                animationEnabled: true,
		legend:{
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
				{  y: 4181563, legendText:"PS 3", indexLabel: "Item 1" },
				{  y: 2175498, legendText:"Wii", indexLabel: "Item 2" },
				{  y: 3125844, legendText:"360",exploded: true, indexLabel: "Item 3" },
				{  y: 1176121, legendText:"DS" , indexLabel: "Item 4"},
				{  y: 1727161, legendText:"PSP", indexLabel: "Item 5" },
				{  y: 4303364, legendText:"3DS" , indexLabel: "Item 6"},
				{  y: 1717786, legendText:"Vita" , indexLabel: "Item 7"}
			]
		}
		]
	});
	chart.render();

  var donchart = new CanvasJS.Chart("donchartContainer",
	{
		title:{
			text: "Sale By Item",
			verticalAlign: 'top',
			horizontalAlign: 'left'
		},
                animationEnabled: true,
		data: [
		{        
			type: "doughnut",
			startAngle:20,
			toolTipContent: "{label}: {y} - <strong>#percent%</strong>",
			indexLabel: "{label} #percent%",
			dataPoints: [
				{  y: 67, label: "Item 1" },
				{  y: 28, label: "Item 2" },
				{  y: 10, label: "Item 3" },
				{  y: 7,  label: "Item 4"},
				{  y: 4,  label: "Item 5"}
			]
		}
		]
	});
	donchart.render();

//donchartContainer
	$("#chartContainer").CanvasJSChart(options);
  $("#splineChartContainer").CanvasJSChart(optionSpline);
    }
    ]
  });
