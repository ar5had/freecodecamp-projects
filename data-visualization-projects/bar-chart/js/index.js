// Plots bar chart
function plot() {

  // JSON url
  var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

  // Setting margin
  var margin = {top: 30, bottom: 40, left: 70, right:35};

  // Assigning width and height to vars for svg
  var width = window.innerWidth - margin.right - margin.left;
  var height = (window.innerHeight - 140 - margin.bottom - margin.top);

  // Scale for y axis
  var y = d3.scaleLinear()
          .range([height, 0]);

  // Scale for handling data of x-axis
  var x = d3.scaleBand()
          .range([0, width]);

  // Scale for x axis
  var xD = d3.scaleTime()
          .range([0, width]);

  // Scale for colors of rect
  var helperScale = d3.scaleLinear()
          .range([1, .5])
          .domain([0, height]);
  var colorScale = d3.interpolateCool;

  // Defining x-axis and y-axis
  if(width < 600)
    ticks = 7;
  else
    ticks = 12;
  var xaxis = d3.axisBottom(xD)
              .ticks(ticks);
  var yaxis = d3.axisLeft(y);

  // Setting svg element's height
  var chart = d3.select("#chart")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.bottom + margin.top)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")" );

  // Sending get request
  $.getJSON(url, function(data, status) {

    // Unsuccesful get request case
    if(status !== "success") {
      alert("Data fetching failed!");
      return;
    }

    // Formatting data
    var formattedData = data["data"].map(function(elem) {
      return {x: new Date(elem[0]), y: elem[1]};
    });

    // Setting Domain
    y.domain([0, d3.max(formattedData.map(function(e){return e.y;}))]);
    x.domain(formattedData.map(function(e){return new Date(e.x)}));
    xD.domain( [ new Date(formattedData[0]["x"]), new Date(formattedData[formattedData.length - 1]["x"]) ]);

    // Adding x-axis
      chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis);

    // adding y-axis
    chart.append("g")
      .attr("class", "y axis")
      .call(yaxis)
    .append("text")
      .attr("transform","rotate(-90)")
      .attr("y", "15")
      .attr("class", "yinfo")
      .text("Gross Domestic Product, USA")

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                 'Sep' ,'Oct', 'Nov', 'Dec'];

    // Tooltip object
    var div = d3.select(".tooltip");

    // adding rects
    var bar = chart.selectAll(".rect")
      .data(formattedData)
      .enter()
    .append("rect")
      .attr("transform", function(d, i) { return "translate(" + x(d.x) + ", 0)"; })
      .attr("class", "rect")
      .attr("y", function(d){ return y(d.y);})
      .attr("height", function(d){ return height - y(d.y);})
      .attr("width", x.step())
      .style("fill", function(d){ return colorScale(helperScale(y(d.y)))})
      .on("mouseover", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", 1);
        div.html('<span class="gdp">'+ d.y + " Billion $" + '</span><span class="date">' + months[d.x.getMonth()] + ", " + (d.x.getFullYear()) + '</span>')
          .style("left", (((- d3.event.pageX + $("body").width()) > $("body").width()/2) ?  d3.event.pageX + 10 : d3.event.pageX - 170 )+ "px")
          .style("top", (d3.event.pageY - 60) + "px");
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", 0);
      });
    addDescription(data.description);
  });// getJSON ends
}

// adds description about bar chart
function addDescription(description) {
  $("#description").html(description);
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
      $("#chart").empty();
      plot();
    }, true);
  }
});
