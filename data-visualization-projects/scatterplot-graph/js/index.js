function plot() {

	// Setting margin
	var margin = { top: 40, bottom: 20, left: 40, right: 30 };

	// Setting height and width
	var width = window.innerWidth - margin.right - margin.left;
	var height = (window.innerHeight - 150 - margin.bottom - margin.top);


	// setting scales
	var xscale = d3.scaleLinear().range([0, width]);
	var yscale = d3.scaleLinear().range([height, 0]);

	// setting axises
	var xaxis = d3.axisBottom(xscale).ticks(8);
	var yaxis = d3.axisLeft(yscale).ticks(4);

	// get request url
	var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

	var graph = d3.select("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// fetching data
	$.getJSON(url, function(data, status) {
	if(status !== "success") {
		alert("data-fetching failed");
		return;
	}
	else{
		// doing useful stuff here.
		var ranks = data.length + (10 - data.length % 10);
		var timeDiff = -(data[0]["Seconds"]) + (data[data.length - 1]["Seconds"]) + 5;
		yscale.domain([ranks, 1]);
		xscale.domain([timeDiff, 0]);

		// adding axises
		graph.append("g")
			.attr("id", "xaxis")
			.attr("transform", "translate(0," + height + ")")
			.call(xaxis)
		.append("text")
			.attr("transform","translate(" + (width - 135) + ", -10)")
			.attr("x", "15")
			.attr("class", "xinfo")
			.text("SECONDS BEHIND FASTEST TIME");

		graph.append("g")
			.attr("id", "yaxis")
			.call(yaxis)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", "15")
			.attr("class", "yinfo")
			.text("RANK");

		var tooltip = d3.select(".tooltip");
		var bestTimings = data[0]["Seconds"];
		data.forEach(function(elem) {
			var x = xscale(elem["Seconds"] - bestTimings);
			var y = yscale(elem["Place"]);
			var circle = graph.append("circle")
								.on("mouseover", function(d) {
	        				tooltip
									.style("z-index", "9999")
									.transition()
	          			.duration(100)
	          			.style("opacity", "1")
									.transition()
	          			.duration(200)
									.style("height","190px");
									$(".name").html(elem["Name"]);
									$(".place").html(elem["Place"]);
									$(".time").html(elem["Time"]+" min");
									$(".year").html(elem["Year"]);
									$(".nationality").html(elem["Nationality"]);
									$(".doping").html(elem["Doping"] ? "Has doped" : "Has not doped");
									tooltip.style("left", (((- d3.event.pageX + $("body").width()) > $("body").width()/2) ?  d3.event.pageX + 30 : d3.event.pageX - 200)+ "px")
	          .style("top", (d3.event.pageY + "px"));
	      				})
	      				.on("mouseout", function(d) {
	        				tooltip.transition()
	          				.duration(200)
										.style("height","0px")
										.transition()
										.duration(100)
	          				.style("opacity", "0")
										.style("z-index", "-999")
	      				})
								.on("focus", function() {
									tooltip
									.style("z-index", "9999")
									.transition()
	          			.duration(100)
	          			.style("opacity", "1")
									.transition()
	          			.duration(200)
									.style("height","auto");
									$(".name").html(elem["Name"]);
									$(".place").html(elem["Place"]);
									$(".time").html(elem["Time"]+" min");
									$(".year").html(elem["Year"]);
									$(".nationality").html(elem["Nationality"]);
									$(".doping").html(elem["Doping"] ? "Has doped" : "Has not doped");
									if((- d3.event.pageX + $("body").width()) > $("body").width()/2)
										tooltip.style("left", d3.event.pageX + 10);
									else
										tooltip.style("right", d3.event.pageX + 10);
	         				tooltip.style("top", (d3.event.pageY + "px"));
								})
								.attr("r", 4.5)
								.attr("cx", x)
								.attr("cy", height)
								.transition()
								.duration(1000)
								.attr("cy", y);


			if(elem["Doping"])
				circle.attr("class", "doper")
		});

		d3.select("h4")
			.text("35 Fastest times up Alpe d'Huez");
	}
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
			$("h4").html("");
      plot();
    }, true);
  }
});
