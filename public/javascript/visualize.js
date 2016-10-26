const WIDTH = 1280;
const HEIGHT = 800;
const MARGIN = 30;
const RADIUS = 1;

var genrateData = function() {
	var result = [];
	for (var i = 0; i < 10; i++) {
		result.push(Math.floor(Math.random()*100));		
	}
	return result;
}

var updateData = function(data) {
	data.shift();
	data.push(Math.floor(Math.random()*100));
};

var data = genrateData();

var xScale = d3.scaleLinear()
	    .domain([0,10])
	    .range([0, WIDTH - (2 * MARGIN)]);

var yScale = d3.scaleLinear()
    .domain([0,100])
    .range([HEIGHT - (2 * MARGIN), 0]);


var loadChart = function(){

	var svg = d3.select('.chart').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);
	

	var xAxis = d3.axisBottom(xScale).ticks(10);
	var yAxis = d3.axisLeft(yScale).ticks(10);

	svg.append('g')
		.attr('transform', 'translate('+MARGIN+', '+(HEIGHT - MARGIN)+')')
		.call(xAxis);

	svg.append('g')
		.attr('transform', 'translate('+(MARGIN)+', '+ MARGIN +')')
		.call(yAxis);

	var g = svg.append('g')
		.classed('randomNumbers', true)
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');
}

var updateChart = function(){
	d3.select('.randomNumbers').remove()

	var svg = d3.select('svg');

	var g = svg.append('g')
		.classed('randomNumbers', true)
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');
	
	updateData(data);

	g.selectAll('circle').data(data)
		.enter().append('circle')
		.attr('r', RADIUS)
		.attr("cx", function(d, index) {return xScale(index+1)})
		.attr("cy", function(d) {return yScale(d)})

	var line = d3.line()
      	.x(function(d, index) {return xScale(index+1)})
      	.y(function(d) {return yScale(d)})

	 d3.select(".randomNumbers").append("path")
      .attr("d", line(data))
      .attr("stroke", "steelblue")
      .attr("stroke-width", "2")
      .attr("fill", "none");
}

window.onload = function() {
	loadChart();
	setInterval(updateChart, 500);
}
