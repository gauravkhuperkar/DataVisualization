var loadSimpleShapes = function() {
	var svg = d3.select(".container")
					.append("svg")
					.attr("class","svg");

	svg.append("line")
		.attr("class", "line")
		.attr("x1",100)
		.attr("y1",0)
		.attr("x2",0)
		.attr("y2",100)
			
	svg.append("circle")
		.attr("class", "circle")

	svg.append("rect")
		.attr("class", "square")

    svg.append("polygon")
		.attr("class", "triangle")
		.attr("points","450,100,500,0,550,100");
}

window.onload = loadSimpleShapes;
