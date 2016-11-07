var numbers = [1,2,3,4,5,6,7,8,9,10];
var header = ["Title", "n = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"];

var getData = function() {
	var squares = numbers.map(function(each) {
		return each*each
	});

	var logs = numbers.map(function(each){
		return Math.log10(each);
	});

	var roundOfLogs = logs.map(function(each){
		return Math.round(each);
	});

	var data = []
	data.push(["n square",squares.join(" ")]);
	data.push(["log(n)",logs.join(" ")]);
	data.push(["log(n) rounded",roundOfLogs.join(" ")]);

	return data;
};

var makeTableRow = function(data, row) {
	for (var i = 0; i < data.length; i++) {
		row.append("tr")
			.selectAll("th")
			.data(data[i])
			.enter()
			.append("th")
			.text(function(d){return d})
	};
};

var loadTable = function() {
	var table =  d3.select(".continer").append("table");
	var tableHead = table.append("thead");
	var tableBody = table.append("tbody");

	// for table head
	makeTableRow([header],tableHead)

	// for table body
	makeTableRow(getData(), tableBody);
};

window.onload = loadTable
