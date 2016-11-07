var numbers = [1,2,3,4,5,6,7,8,9,10];
var header = ["Title", "numbers 1 to 10"];

var getData = function() {
	var squares = numbers.map(function(each) {
		return each*each
	});

	var logs = numbers.map(function(each){
		return Math.log10(numbers);
	});

	var roundOfLogs = logs.map(function(each){
		return Math.round(numbers);
	});

	var data = {}
	data[numbers.join(" ")] = squares.join(" ");
	data[numbers.join(" ")] = logs.join(" ");
	data[numbers.join(" ")] = roundOfLogs.join(" ");

	return data;
}

var loadTable = function() {
	var table =  d3.select(".continer").append("table");
	var head = table.append("thead");
	var body = table.append("tbody");

	// for header
	head.append("tr")
		.selectAll("th")
		.data(header)
		.enter()
		.append("th")
		.text(function(h){return h})

}

window.onload = loadTable

