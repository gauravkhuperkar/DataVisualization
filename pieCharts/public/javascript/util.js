var util = {}
util.appendSvg = function() {
	return d3.select('.continer').append('svg')
		    .attr("width", 800)
		    .attr("height", 600)
		    .append('g')
		    .attr('transform', 'translate(' + 400 + ',' + 300 + ')');
}

util.appendArc = function(inner_Radius) {
	return d3.arc()
	    	.outerRadius(300)
	    	.innerRadius(inner_Radius);
}

util.appendPie = function() {
	return d3.pie()
        	.value(function(d) { return d;})
		    .sort(null)
}

util.appendSemiPie = function() {
	return util.appendPie()
        	.startAngle(0*(Math.PI / 180))
        	.endAngle(180*(Math.PI / 180));
}

util.appendPath = function(svg,pie,data,arc) {
	var color = d3.schemeCategory20;
	return svg.selectAll('path')
	        .data(pie(data))
	        .enter()
	        .append('path')
	        .attr('d', arc)
	        .attr('fill', function (d, i) {
	            return color[i];
	        });
}
