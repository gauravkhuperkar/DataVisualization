var header = ["Title", "1, 2, 3, 4, 5, 6, 7, 8, 9, 10"];

var getData = function() {
	var numbers = [1,2,3,4,5,6,7,8,9,10];
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
	data.push(["n",numbers.join(", ")]);
	data.push(["n square",squares.join(", ")]);
	data.push(["log(n)",logs.join(", ")]);
	data.push(["log(n) rounded",roundOfLogs.join(", ")]);

	return data;
};

var makeTableRow = function(data, row, attribute) {
	for (var i = 0; i < data.length; i++) {
		row.append("tr")
			.selectAll(attribute)
			.data(data[i])
			.enter()
			.append(attribute)
			.text(function(d){return d})
            .style("border", "1px black solid")
            
	};
};

var loadTable = function() {
	var table =  d3.select(".continer").append("table");
	var tableHead = table.append("thead");
	var tableBody = table.append("tbody");

	// for table head
	makeTableRow([header],tableHead, "th")

	// for table body
	makeTableRow(getData(), tableBody, "td");
};

window.onload = loadTable
