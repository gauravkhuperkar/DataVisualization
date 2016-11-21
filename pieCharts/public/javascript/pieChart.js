var loadChart = function() {
	var data = [1, 1, 2, 2, 1, 2, 1];
	var svg = util.appendSvg();
	var arc = util.appendArc(0);
	var pie = util.appendPie();
	var path = util.appendPath(svg,pie,data,arc);
};

window.onload = loadChart