//Global variables
var activeCountry;
var tooltip = d3.select("#map-holder").append("div")
	.attr("class", "tooltip");
var mouse;
// DEFINE VARIABLES
// Define size of map group
// Full world map is 2:1 ratio
// Using 12:5 because we will crop top and bottom of map
w = $("#map-holder").width();
h= $("#map-holder").height();
var time=2017;
var minZoom;
var maxZoom;

active=d3.select(null);
d3.select("#year").on("input", function() {
 update(+this.value);
}); 
// color scale
var color=d3.scaleLinear().domain([0,15000]).range([0,255]);


// Define map projection
var projection = d3
      .geoEquirectangular()
      .center([0, 0]) // set centre to further North as we are cropping more off bottom of map
      .scale([w / (2 * Math.PI)]) // scale to fit group width
      .translate([w / 2, h / 2]) // ensure centred in group
    ;
 
    // Define map path
var path = d3
      .geoPath()
      .projection(projection)
    ;
var svg = d3
      .select("#map-holder")
      .append("svg")
      // set to the same size as the "map-holder" div
      .attr("width", $("#map-holder").width())
	  .attr("height", $("#map-holder").height())
	  .style("border", "1px solid black")
;

var result = [];


// get map data and popularity data 

d3.queue()
	.defer(d3.json, "./data/custom.geo.json")
	.defer(d3.csv, "./data/updated.csv")
	//.defer(d3.csv, "religionwithgoodnames") // Load csv
	.await(ready);

function ready(error, json, csvdata) { 
if (error) throw error;
/*d3.json(
  "custom.geo.json",
  function(json) {*/
		
		
	csvdata.forEach(function(csvdata) {
		csvdata.latitude = +csvdata.latitude;
		csvdata.longitude = +csvdata.longitude;
		csvdata.birth_year = +csvdata.birth_year
		});
/*
			relig.forEach(function(relig) {
				relig.popu = +relig.popu;
				relig.fullname = relig.fullname
				});
*/
	var df = csvdata.filter(function(d) {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]});
	var pidx={};
			
			
	//POPULARITY INDEX PER COUNTRY
	for (i=0; i<df.length; i++) {
		if (df[i].state===undefined) {continue}
		if (pidx[df[i].state]===undefined) {
					
			pidx[df[i].state]=Number(df[i].historical_popularity_index);
			}
		else {
			pidx[df[i].state]+=Number(df[i].historical_popularity_index);}
			}
			
			
	
		
	countriesGroup = svg
	   .append("g")
	   .attr("id", "map")
		;
		
	// add a background rectangle
	countriesGroup
	   .append("rect")
	   .attr("x", 0)
	   .attr("y", 0)
	   .attr("width", $("#map-holder").width())
	   .attr("height", $("#map-holder").height())
	   .on("click", reset)
	   .on("mouseover", )
	;
	
	// draw a path for each feature/country
	countries = countriesGroup
	   .selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
	   .attr("d", path)
	   //.style("stroke","white")
	   .attr("id", function(d, i) {
		  return "country" + d.properties.iso_a3;
		  })
		.style('fill', function(d, i) {
		if (pidx[d.properties.iso_a3]===undefined){
	    s=5000;}
		else{
			s=pidx[d.properties.iso_a3]**(0.35)/(d.properties.pop_est**0.3)*370000;} //IS ALREADY NORMALIZED
		return "rgb(" + color(s)/4 +","+ color(s)/5+", " + color(s)/2 + ")";})
	   .attr("class", "country")
	   .on("click", clicked)
	   .on('mouseover', function(d){
			activeCountry = d.properties.name;
			//console.log(activeCountry);
			d3.select(this).classed("country-on", true);
	
			mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
		
			tooltip.classed("hidden", false)
				.attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
				.html(activeCountry);

			// Update the stacked area chart
			d3.selectAll(".area")
				.classed("areaLight", function(d){
					if(d.key == activeCountry) {console.log(d.key);
												return true; }
					else return false;
				   });
		})//end of mouseover

	   .on("mouseout", function(d){
			d3.select(this).classed("country-on",false);
			tooltip.classed("hidden", true);

			// turn back the stacked area map
			d3.selectAll(".areaLight")
				.attr("class", "area");

	   }) // end of mouseout
	   ;  
	
	
	var persons = countriesGroup
				.selectAll("circle")
				.data(df)
				.enter()
				.append("circle");
			
			
	var personattr = persons
					.attr("r", 0.8)
					.attr("transform", function(d) {return "translate(" + projection([d.longitude, d.latitude]) + ")";})
					.style("fill",function(d){if (time>d.birth_year) {return "goldenrod"} else {return "none"}})
					.style("opacity",0.6);	
	}
	
function update(year) {
	d3.select("#year-value").text(year);
	d3.select("#year").property("value", year);
	d3.selectAll("circle")
	.style("fill",function(d){if (year>d.birth_year) {return "goldenrod"} else {return "none"}})
	d3.selectAll("text")
	//.style("fill",function(d){if (((year-d.birth_year)<100) && ((year-d.birth_year)>=0)) {return "black"} else {return "none"}})
	}
			
function clicked(d) { 
	if(active.node()===this) return reset();
	active.classed("active", false);
	active = d3.select(this).classed("active", true);
	
	  var bounds = path.bounds(d),
	dx = bounds[1][0] - bounds[0][0],
	dy = bounds[1][1] - bounds[0][1],
	x = (bounds[0][0] + bounds[1][0]) / 2,
	y = (bounds[0][1] + bounds[1][1]) / 2,
	scale = .9 / Math.max(dx / w, dy / h),
	translate = [w / 2 - scale * x, h / 2 - scale * y];
	
	  countriesGroup.transition()
	.duration(750)
	.style("stroke-width", 1.5 / scale + "px")
	.attr("transform", "translate(" + translate + ")scale(" + scale + ")");
	
}
			
		
function reset() {
	active.classed("active", false);
	active = d3.select(null);
	
	countriesGroup.transition()
	.duration(750)
	.style("stroke-width", "1.5px")
	.attr("transform", "");
}

update(time);