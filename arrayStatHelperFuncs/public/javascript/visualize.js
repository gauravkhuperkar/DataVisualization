var data = [4,5,6,7,8];
var min = d3.min(data);
var max = d3.max(data);
var extent = d3.extent(data);
var sum = d3.sum(data);
var mean = d3.mean(data);
var median = d3.median(data);
var quantile = d3.quantile(data, 1);
var variance = d3.variance(data);
var deviation = d3.deviation(data);

var loadData = function() {
	var representation = "<br>Data is: "+data+"<br>"
	+ "Min is: "+min+"<br>"+"Max is: "+max+"<br>"
	+"Event is: "+extent+"<br>"+"Sum is: "+sum+"<br>"
	+"Mean is: "+mean+"<br>"+"Median is: "+median+"<br>"
	+"Quantile is: "+quantile+"<br>"+"Variance is: "+variance
	+"<br>"+"Deviation is: "+deviation;
	d3.select('.container').html(representation)
}

window.onload = loadData;
