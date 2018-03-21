
		// variables from other part
		var scaleRadius;
		// DEFINE VARIABLES
		// Define size of map group
		// Full world map is 2:1 ratio
		// Using 12:5 because we will crop top and bottom of map
		wi =$("#map-holder").width();
		he = $("#map-holder").height();
		var time=2018;
		var minZoom;
		var maxZoom;
		var geojson;
		d3.json("./data/custom.geo.json", function(d){
			geojson = d;
		});

		var return_pop = function(iso3_code){
			for (var i = 0; i < geojson.features.length; i++){
				if (geojson.features[i].properties.iso_a3 === iso3_code){
					return geojson.features[i].properties.pop_est;
				}
			}
		};

		var norm_pidscience = {},
			norm_pidreligion = {},
			norm_piddiff = {};
		var colorBoth;
		var colorReligion;
		var colorScience;
		var continents = {};
		var temp;

	// 	// COLOR
	// 	// colors are the most important things....
// colors are the most important things....
var colorAsia = "#2b83ba",
	colorOc = "#c51b8a",
	colorEurope = "#d7191c",
	colorNAmerica = "#4daf4a",
	colorSAmerica = "#ffb833",
	colorAfrica = "#8c510a";
	
// Load continent data
d3.csv("./data/continents_data.csv", function(data){
for (var i = 0; i < data.length; i++){
	var row = data[i];
	continents[row["Country"]] = row["Continent"];
};
});

// Function to define colors
var colorScaleMap = function(d){
switch(d.properties.continent){
	case "Asia":
		return colorAsia;
	case "Oceania":
		return colorOc;
	case "Africa":
		 return colorAfrica;
	case "South America":
		return colorSAmerica;
	case "North America":
		return colorNAmerica;
	case "Europe":
		return colorEurope;
}
};//

		Relig.checked=true
		Scientech.checked=true
		active=d3.select(null);

		d3.select("#year").on("input", function() {
		 update(+this.value);
		});
		d3.select("#Scientech").on("input", function() {
			updatescienc();
		});
		d3.select("#Relig").on("input", function() {
			updaterelig();
		});
		// colora scale
		// var colora=d3.scaleLinear().domain([0,15000]).range([0,255]);


		// Define map projection
		var projection = d3
        .geoEquirectangular()
        .center([0, 0]) // set centre to further North as we are cropping more off bottom of map
        .scale([wi / (2 * Math.PI)]) // scale to fit group width
        .translate([wi / 2, he / 2]) // ensure centred in group
      ;

	     // Define map path
		var path = d3
        .geoPath()
        .projection(projection)
      ;

		var svgmap = d3
        .select("#map-holder")
        .append("svg")
        // set to the same size as the "map-holder" div
        .attr("width", $("#map-holder").width())
		.attr("height", $("#map-holder").height())
// 		.style("border", "1px solid black")
		;

			countriesaGroup = svgmap
			   .append("g")
			   .attr("id", "map")
				;

			// add a background rectangle
			countriesaGroup
			   .append("rect")
			   .attr("x", 0)
			   .attr("y", 0)
			   .attr("width", wi)
			   .attr("height", he)
			   .on("click", reset)
			;


		var tooltipB = d3.select("#map-holder")
		.append("div")
		.attr("class", "tooltip")
		.style("position", "absolute")
		.style("z-index", "20")
		.classed("hidden", "true")
		.style("top", "15%")
		.style("left", "76%");


		// legend - important;
		var ylegend = he*1/2;
		var xlegend = wi*40/2000;
		var hlegend = he*1/4;

		var legendArea = svgmap.append("svg:svg")
				.attr("id", "legend")
				.attr("width", wi/8)
				.attr("height", 200)
				.attr("x", wi/15)
				.attr("y", he * 0.3);


				d3.select("#map").remove();
			countriesaGroup = svgmap
			   .append("g")
			   .attr("id", "map")
				;
		d3.queue()
		.defer(d3.json, "./data/custom.geo.json")
		.defer(d3.csv, "./data/updated.csv")
		.await(ready);

		function ready(error, json, csvdata) {
		if (error) throw error;

			csvdata.forEach(function(csvdata) {
				csvdata.latitude = +csvdata.latitude;
				csvdata.longitude = +csvdata.longitude;
				csvdata.birth_year = +csvdata.birth_year
				});

			var dfscience= csvdata.filter(function(d) {if(d.domain==='Science & Technology') {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]}});
			dfscience.forEach(function(dfscience){dfscience.colora="blue"})
			var dfreligion= csvdata.filter(function(d) {if(d.industry==='Religion') {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]}});
			dfreligion.forEach(function(dfreligion){dfreligion.colora="red"})
			var dfboth= csvdata.filter(function(d) {if(d.industry==='Religion'||d.domain==='Science & Technology') {return [d.latitude, d.longitude, d.domain, d.industry, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]}});
			var pidx={};


			//POPULARITY INDEX PER COUNTRY
			for (i=0; i<dfboth.length; i++) {
				if (dfboth[i].state===undefined) {continue}
				if (pidx[dfboth[i].state]===undefined) {

					pidx[dfboth[i].state]=Number(dfboth[i].historical_popularity_index);
					}
				else {
					pidx[dfboth[i].state]+=Number(dfboth[i].historical_popularity_index);}
				}

			var pidxscience={};


			//POPULARITY INDEX PER COUNTRY
			for (i=0; i<dfscience.length; i++) {
				if (dfscience[i].state===undefined) {continue}
				if (pidxscience[dfscience[i].state]===undefined) {

					pidxscience[dfboth[i].state]=Number(dfscience[i].historical_popularity_index);
					}
				else {
					pidxscience[dfscience[i].state]+=Number(dfscience[i].historical_popularity_index);}
				}

			temp = pidxscience;
			var pidxreligion={};


			//POPULARITY INDEX PER COUNTRY
			for (i=0; i<dfreligion.length; i++) {
				if (dfreligion[i].state===undefined) {continue}
				if (pidxreligion[dfreligion[i].state]===undefined) {

					pidxreligion[dfreligion[i].state]=Number(dfreligion[i].historical_popularity_index);
					}
				else {
					pidxreligion[dfreligion[i].state]+=Number(dfreligion[i].historical_popularity_index);}
					}

			var pidxboth={}
			for (i=0; i<dfboth.length; i++) {
				if (dfboth[i].state===undefined) {continue}
				if (pidxboth[dfboth[i].state]===undefined) {

					pidxboth[dfboth[i].state]=Number(dfboth[i].historical_popularity_index);
					}
				else {
					pidxboth[dfboth[i].state]+=Number(dfboth[i].historical_popularity_index);}
					};

			// // Begin Huyen's added part
			// // define datas for normalized HPI....

			// for (i = 0; i < d3.keys(pidxscience).length; i++){
			// 	var country = d3.keys(pidxscience)[i];
			// 	norm_pidscience[country] = pidxscience[country] / return_pop(country)**0.3;
			// };

			// for (i = 0; i < d3.keys(pidxreligion).length; i++){
			// 	var country = d3.keys(pidxreligion)[i];
			// 	norm_pidreligion[country] = pidxreligion[country] / return_pop(country)**0.3;
			// };


			// for (i = 0; i < d3.keys(norm_pidscience).length; i++){
			// 	var country = d3.keys(norm_pidscience)[i];
			// 	if (norm_pidreligion[country]){
			// 		norm_piddiff[country] = norm_pidscience[country] - norm_pidreligion[country];
			// 	};
			// };

			// colorBoth = d3.scaleSequential(d3.interpolateRdBu)
			// 					.domain([d3.min(d3.values(norm_piddiff)),d3.max(d3.values(norm_piddiff))]);
			// colorScience = d3.scaleSequential(d3.interpolateBlues)
			// 					.domain([d3.min(d3.values(norm_pidscience)),d3.max(d3.values(norm_pidscience))]);
			// colorReligion = d3.scaleSequential(d3.interpolateReds)
			// 					.domain([d3.min(d3.values(norm_pidreligion)),d3.max(d3.values(norm_pidreligion))]);

			// // End of Huyen's added part...

			// draw a path for each feature/country
			countriesa = countriesaGroup
			   .selectAll("path")
			   .data(json.features)
			   .enter()
			   .append("path")
			   .attr("d", path)
				// .style("stroke-width","1px")
				.style("stroke", "white")
			//    .style("stroke",function(d){if(d.properties.continent==='Europe'){return 'red'} else if (d.properties.continent==='Asia'){return 'blue'} else if (d.properties.continent==='North America'){return 'green'} else if (d.properties.continent==='South America'){return 'orange'} else if (d.properties.continent==='Africa'){return 'lightblue'} else if (d.properties.continent==='Oceania') {return 'purple'} else {return 'white'}})
			.style("opacity",0.8)
			.style("stroke-opacity",0.4)
			   .attr("id", function(d, i) {
				  return d.properties.iso_a3;})
			   .style('fill', function(d) {

					return colorScaleMap(d);

				})

			   .attr("class", "country")
				.on("click", clicked)
				.on('mouseover', function(d){ // mouse over effect -- Huyen
					activeCountry = d.properties.name;
					d3.select(this).classed("country-on", true);

					mouse = d3.mouse(svgmap.node()).map( function(d) { return parseInt(d); } );

					// Update the stacked area chart
					d3.selectAll(".area")
						.classed("blur", function(d){
							if(d.key == activeCountry) {//console.log(d.key);
														return false; }
							else return true;
						   });

					// Showing country names
					d3.select("#explanation")
						.style("visibility", "")
						.text(activeCountry);

					d3.selectAll(".arc")
						.style("opacity", function(d){
							// var sequenceArray = d.ancestors().reverse();
							// console.log(sequenceArray);
							if(d.data.name == activeCountry){
								return 1;
							} else return 0.1;
						});

					// Update the bubble
					d3.selectAll("#bubblecircle")
						.filter(function(d) { return d.country == activeCountry })
						.classed("bubblesLight", true)
						.attr('r', function(d) { return 15});


				})//end of mouseover

				.on("mouseout", function(d){ //mouse out effect -- Huyen
					d3.select(this).classed("country-on", false);

					// turn back the stacked area map
					d3.selectAll(".area")
						.classed("blur", false);

					// hide back visibility
					d3.select("#explanation")
					 .style("visibility", "hidden");

					 // turn back the bubble
					 d3.selectAll("#bubblecircle")
					 	.classed("bubblesLight", false)
					 	.attr('r', function(d) { return scaleRadius(d.popsize)});
					
			   }) // end of mouseout



			var persons = countriesaGroup
						.selectAll("circle")
						.data(dfboth)
						.enter()
						.append("circle");

			var personattr = persons
							.attr("id",function(d){if(d.domain==='Science & Technology'){return "scienceattr"} else {return 'religiattr'}})
							.attr("r", 3)
							.attr("transform", function(d) {return "translate(" + projection([d.longitude, d.latitude]) + ")";})
							.attr("domaincol",function(d){if(d.domain==='Science & Technology'){return "blue"} else {return "red"}})
							.style("fill",function(d){if(d.domain==='Science & Technology'){

							if(time>=d.birth_year && time<=d.birth_year+100 && Relig.checked===true) {return 'skyblue'} else {return "none"}}
							else
							if(time>=d.birth_year && time<=d.birth_year+100 && Relig.checked===true) {return 'darkred'} else {return "none"}}
								)
							//.style("stroke",function(d){if (time>=d.birth_year && time<=d.birth_year+100 && Relig.checked===true) {return "pink"} else {return "none"}})
							.on('mouseover', function(d){
									activePerson = d.full_name;
									d3.select(this).classed("areaLight", true);
									mousex = d3.mouse(this);
									mousex = mousex[0];
									tooltipB.html(  "<p>" + d.occupation + "<br>" + d.full_name + " (" + d.birth_year + ")" + " from " + d.country + "</p>" )
											  .classed("hidden", false);
								})
							//.style("stroke-width","1px");

			.on('mouseout', function(d){
			d3.select(this).classed("areaLight", false);
			tooltipB.classed("hidden", true);});



			if (Scientech.checked===false){
			d3.selectAll('#scienceattr')
			.style("fill","none")
			.style("stroke","none")
			}
			update(d3.select("#year").property("value"))

	    }

		function update(year) {
			d3.select("#year-value").text(year);
			d3.select("#year").property("value", year);
	    		if(Scientech.checked===true){
	    			d3.selectAll("#scienceattr")
					.style("fill",function(d){if (year>=d.birth_year && year<=d.birth_year+100) {return "darkblue"} else {return "none"}})
					.style("stroke",function(d){if (year>=d.birth_year && year<=d.birth_year+100) {return "skyblue"} else {return "none"}})
	    		}
	    		if(Relig.checked===true){
	    			d3.selectAll("#religiattr")
					.style("fill",function(d){if (year>=d.birth_year && year<=d.birth_year+100) {return "darkred"} else {return "none"}})
					.style("stroke",function(d){if (year>=d.birth_year && year<=d.birth_year+100) {return "pink"} else {return "none"}})
	    		}
			}



		function updatescienc(){
			if (Scientech.checked===false){
			d3.selectAll('#scienceattr')
			.style("fill","none")
			.style("stroke","none")
			}

			else
			{
			d3.selectAll('#scienceattr')
			.style("fill","skyblue")
			.style("stroke","none")
			}
			update(d3.select("#year").property("value"));

	    }


		function updaterelig(){
			if (Relig.checked===false){
			d3.selectAll('#religiattr')
			.style("fill","none")
			.style("stroke","none")
			}

			else
			{
			d3.selectAll('#religiattr')
			.style("fill","darkred")
			.style("stroke","none")
			}
			update(d3.select("#year").property("value"))
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
			scale = .9 / Math.max(dx / wi, dy / he),
			translate = [wi / 2 - scale * x, he / 2 - scale * y];


			  countriesaGroup.transition()
			.duration(750)
			.style("stroke-width", 1.5 / scale + "px")
			.attr("transform", "translate(" + translate + ")scale(" + scale + ")");

	}


		function reset() {
		active.classed("active", false);
		active = d3.select(null);

		countriesaGroup.transition()
		.duration(750)
		.style("stroke-width", "1.5px")
		.attr("transform", "");
}

			update(time);
