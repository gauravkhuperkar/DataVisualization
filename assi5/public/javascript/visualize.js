var numbers = [0,1,2,3,4,5,6,7,8,9,10];

var fontScale = d3.scaleLinear()
					.domain([0, 10])
					.range(['italic bold 12px/30px Georgia, serif','italic bold 120px/180px Georgia, serif'])


var loadNumberBoxes = function() {
	d3.select(".continer")
		.selectAll("div")
		.data(numbers)
		.enter()
		.append("div")
		.classed("numbers",true)
		.style("font",function(d){console.log(fontScale(d));return fontScale(d)})
		.text(function(d){return d})
}

window.onload = loadNumberBoxes
