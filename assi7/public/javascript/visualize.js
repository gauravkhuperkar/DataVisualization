var xScale = d3.scaleLinear()
    .domain([0,10])
    .range([0, 700]);

var yScale = d3.scaleLinear()
    .domain([0,10])
    .range([600, 0]);

var translate = function (x, y) {
	return 'translate(' + x + ',' + y + ')';
}

var appendGroupAndTranslateBy = function(x, y, svg) {
	return svg.append('g').attr('transform', translate(x,y));
}

var appendPath  = function(group, line, data, _class) {
	return group.append("path")
			.classed(_class, true)
			.datum(data)
			.attr("d", line)
}

var appendCircles = function(group, data, yFunction) {
	return group.selectAll('circle').data(data)
		.enter()
		.append('circle')
		.attr("class","circles")
		.attr('cx', function(d){return xScale(d.x)})
		.attr('cy', yFunction)
		.attr('r', 5)
}

var getSineValues = function(d) {
	return yScale(Math.sin(d.x)) - yScale(5);
}

var getNumberLine = function(yFunction, curveProperty) {
	return d3.line()
		.curve(curveProperty)
		.x(function(d) {return xScale(d.x)})
		.y(yFunction);
}

var loadChart = function(property) {
	var WIDTH = 700 ,HEIGHT = 600, MARGIN = 30;
	var data = [{x:0, y:5},{x:1, y:9},{x:2, y:7},{x:3, y:5},{x:4, y:3},{x:6, y:4},{x:7, y:2},{x:8, y:3},{x:9, y:2}];
	
	var svg = d3.select('.continer').append('svg')
			.attr('width', WIDTH)
			.attr('height', HEIGHT+100);

	var xAxis = d3.axisBottom(xScale).ticks(10);
	var yAxis = d3.axisLeft(yScale).ticks(10);

	appendGroupAndTranslateBy(MARGIN,HEIGHT+MARGIN,svg).call(xAxis);
	appendGroupAndTranslateBy(MARGIN,MARGIN,svg).call(yAxis);

	var chartGroup = appendGroupAndTranslateBy(MARGIN,MARGIN,svg);

	var numberLine = getNumberLine(function(d) {return yScale(d.y)}, property)
	var sinValuesLine = getNumberLine(getSineValues, property)

	appendPath(chartGroup, numberLine, data, "numberLine");
	appendPath(chartGroup, sinValuesLine, data, "sinValuesLine");

	appendCircles(svg, data, getSineValues).attr('transform', translate(MARGIN, MARGIN));
	appendCircles(chartGroup, data, function(d){return yScale(d.y)});
};

window.onload = function(){	
	var properties = [d3.curveLinear, d3.curveStep, d3.curveStepBefore, d3.curveStepAfter,
					d3.curveBasis, d3.curveCardinal, d3.curveMonotoneX,d3.curveCatmullRom ];

	properties.forEach(function(each){ loadChart(each);});
};