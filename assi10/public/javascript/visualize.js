
var appendGroupAndTranslateBy = function(x, y, svg) {
	return svg.append('g').attr('transform', 'translate(' + x + ',' + y + ')');
}

var getSineValues = function(d) {
	return (Math.sin(3*d)+1)/2;
}

var loadChart = function(curveProperty) {
	var WIDTH = 800 ,HEIGHT = 600, MARGIN = 30;
	var data = [0,1,2,3,4,5,6,7,8,9];

	var xScale = d3.scaleLinear()
	    .domain([0,10])
	    .range([0, 700]);

	var xAxisTicks =  d3.scaleLinear()
	    .domain([0,1])
	    .range([0, 700]);

	var yScale = d3.scaleLinear()
	    .domain([0,1])
	    .range([600, 0]);
	
	var svg = d3.select('.continer').append('svg')
			.attr('width', WIDTH)
			.attr('height', HEIGHT+100);

	var xAxis = d3.axisBottom(xAxisTicks).ticks(10);
	var yAxis = d3.axisLeft(yScale).ticks(10);

	appendGroupAndTranslateBy(MARGIN,HEIGHT+MARGIN,svg).call(xAxis);
	appendGroupAndTranslateBy(MARGIN,MARGIN,svg).call(yAxis);

	var chartGroup = appendGroupAndTranslateBy(MARGIN,MARGIN,svg);

	var numberLine = d3.line()
					.curve(curveProperty)
					.x(function(d) {return xScale(d)})
					.y(function(d) {return yScale(getSineValues(d))})


	chartGroup.append("path")
		.classed("numberLine", true)
		.datum(data)
		.attr("d", numberLine)

	
	chartGroup.selectAll('circle').data(data)
		.enter()
		.append('circle')
		.attr("class","circles")
		.attr('cx', function(d){return xScale(d)})
		.attr('cy', function(d){return yScale(getSineValues(d))})
		.attr('r', 5)
};

window.onload = function(){	
	var properties = [d3.curveCardinal, d3.curveMonotoneX, d3.curveCatmullRom, d3.curveLinear];

	properties.forEach(function(each){ loadChart(each);});
};