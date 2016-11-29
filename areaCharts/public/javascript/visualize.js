
var appendGroupAndTranslateBy = function(x, y, svg) {
	return svg.append('g').attr('transform', 'translate(' + x + ',' + y + ')');
}

var getSineValues = function(d) {
	return (3*Math.sin(d))+5;
}

var generateLine = function(property) {
	return d3.line()
		.curve(property)
		.x(function(d) {return xScale()(d)})
		.y(function(d) {return yScale()(getSineValues(d))})
}

var generateArea = function(height, property) {
	return d3.area()
		.x(function(d) {return xScale()(d)})
		.y0(function(d) {return yScale()(getSineValues(d))})
		.y1(height)
		.curve(property)
}

var appendPathWithArea = function(data, group, height, area) {
	return group.append("path")
		.datum(data)
		.classed("area", true)
		.attr("d",area)
}

var appendPathWithLine = function(data, group, line) {
	return group.append("path")
		.datum(data)
		.classed("numberLine", true)
		.attr("d", line)
}

var appendCircles = function(data, group) {
	return group.selectAll('circle').data(data)
		.enter()
		.append('circle')
		.attr("class","circles")
		.attr('cx', function(d){return xScale()(d)})
		.attr('cy', function(d){return yScale()(getSineValues(d))})
		.attr('r', 5)
}

var xScale = function() {
	return d3.scaleLinear()
	    .domain([0,10])
	    .range([0, 700]);
}

var yScale = function() {
	return d3.scaleLinear()
	    .domain([0,10])
	    .range([600, 0]);
}

var appendSvg = function(width,height) {
	return d3.select('.continer').append('svg')
		.attr('width', width)
		.attr('height', height+100);
}

// load chart ----------------------------------------------------------------------------------------------------

var loadChart = function(property) {
	var WIDTH = 800 ,HEIGHT = 600, MARGIN = 40;
	var data = [0,1,2,3,4,5,6,7,8,9,10];
	var svg = appendSvg(WIDTH,HEIGHT);
	var xAxis = d3.axisBottom(xScale()).ticks(10);
	var yAxis = d3.axisLeft(yScale()).ticks(10);  
	var group = appendGroupAndTranslateBy(MARGIN+1,MARGIN,svg);
	var area = generateArea(HEIGHT, property);
	var line = generateLine(property);

	appendPathWithArea(data, group, HEIGHT, area);
	appendPathWithLine(data, group, line);
	appendCircles(data, group);
	
	appendGroupAndTranslateBy(MARGIN,HEIGHT+MARGIN,svg).call(xAxis);
	appendGroupAndTranslateBy(MARGIN,MARGIN,svg).call(yAxis);
};

//-----------------------------------------------------------------------------------------------------------------

window.onload = function() {
	var properties = [	d3.curveLinear, d3.curveLinearClosed, 
						d3.curveStepAfter, d3.curveBasisOpen,
						d3.curveCardinalClosed, d3.curveBasis,
					];

	properties.forEach(function(each){ loadChart(each);});
}
