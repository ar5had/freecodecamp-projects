var width = window.innerWidth;
var height = window.innerHeight;

var projection = d3.geoMercator()
	.scale(120)
	.translate([width/2, height/2]);

var path = d3.geoPath()
	.projection(projection);

var svg = d3.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

var div = d3.select("body")
	.append("div")
	.attr("class", "tooltip")
	.style("opacity", "0");

d3.json("https://raw.githubusercontent.com/arshdkhn1/map-data-across-globe/master/worldmap.json", function(error, world) {
   svg.selectAll("g")
						.append("g")
      .data(topojson.object(world, world.objects.countries).geometries)
    .enter()
      .append("path")
      .attr("class", "land")
						.attr("d", path);
	d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", function(error, data) {
		if(error) return console.error(error);
		
		// removing all meteorites that doesn't have 
		// position mentioned in json file
		var modifiedData = data.features.reduce(function(arr,elem){
				if(elem.geometry) {
					arr.push(elem);
				}				
				return arr;
		},[]);
		
		svg.selectAll(".meteor")
			.append("g")
			.data(modifiedData)
			.enter()
			.append("circle")
			
			.on("mouseover", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", 1);
        div.html('<span class="name"><span>Name:</span> '+ d.properties.name + '</span><span class="mass"><span>Mass:</span> ' + d.properties.mass + ' units</span><span class="year"><span>Date:</span> '+ getDate(d.properties.year) + '</span><span class="fall"><span>Fall:</span> ' + d.properties.fall + '</span>')
          .style("left", (((- d3.event.pageX + window.innerWidth) > window.innerWidth/2) ?  d3.event.pageX + 10 : d3.event.pageX - 240 )+ "px")
          .style("top", (d3.event.pageY - 60) + "px");
      })
	.on("mouseout", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", 0);
      })
			.attr("class", "meteor")
			.attr("r", function(d) {return Math.sqrt((d.properties.mass)*.0001)})
			.attr("cx", function(d) {
				return projection(d.geometry.coordinates)[0];})
			.attr("cy", function(d) {
				return projection(d.geometry.coordinates)[1];});
			});

});


function getDate(str) {
	var date = new Date(str);
	return date.toUTCString().substr(0, date.toUTCString().length - 13);
}