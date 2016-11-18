var WIDTH = 700;
var height = 600;

var translate = function (x, y) {
  return 'translate(' + x + ',' + y + ')';
};



var loadChart = function() {
	var data = [{x:0, y:5},{x:1, y:9},{x:2, y:7},{x:3, y:5},{x:4, y:3},{x:6, y:4},{x:7, y:2},{x:8, y:3},{x:9, y:2}];
	
	var xScale = d3.scaleLinear()
		    .domain([0,10])
		    .range([0, WIDTH]);

	var yScale = d3.scaleLinear()
	    .domain([0,10])
	    .range([height, 0]);

	var svg = d3.select('.continer').append('svg')
			.attr('width', WIDTH)
			.attr('height', height+100);

	var xAxis = d3.axisBottom(xScale).ticks(10);
	var yAxis = d3.axisLeft(yScale).ticks(10);

	svg.append('g')
			.attr('transform', translate(31,height+60))
			.call(xAxis);

	svg.append('g')
			.attr('transform', translate(30, 60))
			.call(yAxis);

	var numberLine = d3.line()
					.x(function(d) {return xScale(d.x)})
					.y(function(d) {return yScale(d.y)});

	var sinValuesLine = d3.line()
					.x(function(d) {return xScale(d.x)})
					.y(function(d) {return yScale(Math.sin(d.x)) - yScale(5) });

	var chartGroup = svg.append('g');

	chartGroup.append("path")
			.classed('numberLine', true)
			.datum(data)
			.attr("d", numberLine)
			.attr('transform', translate(30, 62));

	chartGroup.append("path")
			.classed('sinValuesLine', true)
			.datum(data)
			.attr("d", sinValuesLine)
			.attr('transform', translate(30, 62));	

// append Sin Circle
	svg.selectAll('circle').data(data)
		.enter()
		.append('circle')
		.attr("class","circles")
		.attr('cx', function(d){return xScale(d.x)})
		.attr('cy', function(d){return yScale(Math.sin(d.x)) - yScale(5)})
		.attr('r', 5)
		.attr('transform', translate(30, 62));



// append line Circle
	chartGroup.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("class","circles")
				.attr("cx", function(d){return xScale(d.x)})
				.attr("cy", function(d){return yScale(d.y)})
				.attr("r", 5)
				.attr('transform', translate(30, 62));

};



window.onload = loadChart;
