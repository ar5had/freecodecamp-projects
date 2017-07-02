function plot() {

var margin = {top: 80, bottom: 60, left: 80, right: 40};

var width = window.innerWidth - margin.right - margin.left;
var height = window.innerHeight - margin.bottom - margin.top - 80;
height = height > 400 ? height : 300;
width = (width+margin.left+margin.right) > 400 ? width : 400;

var cs = d3.interpolateSpectral;
var xs = d3.scaleLinear().range([0, width]);
// var ys = d3.scaleLinear()
// 			.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
// 		.range([0, height]);
var ys = d3.scaleBand()
			.range([0, height])
			.domain(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);

var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var xa = d3.axisBottom(xs).ticks(width < 600 ? 5 : 10);
var ya = d3.axisLeft(ys);

var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

var graph = d3.select("svg");

graph = graph.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")" );

$.getJSON(url, function(data, status) {
	if(status != "success") {
		alert("data fetching failed");
		return;
	}
	else {
		// doin useful stuff here
		xs.domain([data["monthlyVariance"][0]["year"], data["monthlyVariance"][data["monthlyVariance"]["length"] - 1]["year"]]);

		var minVar = data["monthlyVariance"].reduce(function(min, elem) {
			if (elem.variance < min)
				min = elem.variance;
			return min;
		}, data["monthlyVariance"][0]["variance"]);

		var maxVar = data["monthlyVariance"].reduce(function(max, elem) {
			if (max < elem.variance)
				max = elem.variance;
			return max;
		}, data["monthlyVariance"][0]["variance"]);

		var upperLimit = data.baseTemperature + maxVar;

		var lowerLimit = data.baseTemperature + minVar;

		var limits = [Math.floor(lowerLimit), Math.ceil(upperLimit)];

		var diff = upperLimit - lowerLimit;

		var blockWidth = width < 600 ? width / 14 : 30;

		var colorScale = graph
							.append("g")
							.attr("class", "colorScale")
							.attr("transform", "translate("+(width  -(blockWidth * 15) )+",-60)");

		for(var i = limits[0]; i <= limits[1]; i++) {
			var newColor= colorScale.append("g");
			newColor.append("rect")
				.attr("fill", cs(i/diff))
				.attr("width", blockWidth)
				.attr("height", 20)
				.attr("x", i* blockWidth);
			newColor.append("text")
				.text(i)
				.attr("class", "colorText")
				.attr("y", 40)
				.attr("text-anchor", "left")
				.attr("x", i* blockWidth + 10);
		}

		graph.append("g")
			.attr("transform", "translate(0," + height +")")
			.attr("id", "xaxis")
			.call(xa)
			.append("text")
      .attr("y", "50")
			.attr("x", width/2 - 10)
      .attr("class", "xinfo")
      .text("Years");


		graph.append("g")
			.attr("id", "yaxis")
			.call(ya)
			.append("text")
      .attr("transform","rotate(-90)")
      .attr("y", -50)
			.attr("x", -height/2 + 30)
      .attr("class", "yinfo")
      .text("Months");

		var div = d3.select(".tooltip");

		graph.selectAll(".rect")
			.data(data.monthlyVariance)
			.enter()
			.append("rect")
			.attr("class","rect")
		.on("mouseover", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", 1);
				div.html('<span class="time"><b>Time :</b> '+ monthName[d.month - 1] + ", " + d.year + '</span><span class="variance"><b>Variance :</b> ' + d.variance + '</span> <span class="temperature"><b>Temp :</b> ' + Math.floor((d.variance + data.baseTemperature) * 1000)/1000 + '</span>');
        div.style("left", (((- d3.event.pageX + $("body").width()) > $("body").width()/2) ?  d3.event.pageX + 10 : d3.event.pageX - 170 )+ "px")
          .style("top", (d3.event.pageY - 60) + "px");
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", 0);
      })
			.attr("height", ys.step())
			.attr("width", Math.floor(width/(262)) )
			.attr("transform", function(d){return "translate(" + xs(d.year) + "," + ys(monthName[d.month-1])+")";} )
			.attr("fill", function(d){
					return cs((d.variance + data.baseTemperature)/diff)
			});

	}//gej json ends

	d3.select("h4")
		.text("Monthly Global Land-Surface Temperature");

	d3.select("p")
		.text("(" + data["monthlyVariance"][0]["year"] + "-" + data["monthlyVariance"][data["monthlyVariance"].length - 1]["year"] + ")");
});

}

$(document).ready(function() {
  plot();
  // for ie 9
  if(window.attachEvent) {
    window.attachEvent('onresize', function() {
        alert('attachEvent - resize');
    });
  }
  else if(window.addEventListener) {
    window.addEventListener('resize', function() {
      $("svg").empty();
			$("h4, p").html("");
			if (window.innerWidth <= 520) {
    		var mvp = document.getElementById('metaTag');
    		mvp.setAttribute('content','width=520');
			}
			plot();
    }, true);
  }
});
