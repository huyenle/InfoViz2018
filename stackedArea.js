// I'm always hungry..

// Global variables
var dataset, xScaleA, yScaleA, xAxisA, yAxisA, area, series, areaGroup;
var countries;
var continents = {};
var uniNr;

// colors are the most important things....
var colorAsOc = "#2b83ba",
	colorEurope = "#d7191c",
	colorNAmerica = "#a6d854",
	colorSAmerica = "#d95f0e",
	colorAfrica = "#756bb1";


// Load continent data
d3.csv("./data/continents_data.csv", function(data){
	for (var i = 0; i < data.length; i++){
		var row = data[i];
		continents[row["Country"]] = row["Continent"];
	};
});

// Function to define colors
var colorScale = function(d){
	switch(continents[d.key]){
		case "Asia":
			return colorAsOc;
		case "Oceania":
			return colorAsOc;
		case "Africa":
		 	return colorAfrica;
		case "South America":
			return colorSAmerica;
		case "North America":
			return colorNAmerica;
		case "Europe":
			return colorEurope;
	}
};


// Settings
var w = $("#stackedArea").width();
var h= $("#stackedArea").height();
var p = 20;

var tooltipA = d3.select("#stackedArea")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("z-index", "20")
    .classed("hidden", "true")
    .style("top", 0.65 * h + $("#map-holder").height() + "px")
	.style("left", "3%");


var rowConverter = function(d, i, cols) {
	//Initial 'row' object includes only year
	var row = {
        year: d.Year,  //Make a new year object
	};
	//Loop
	for (var i = 1; i < cols.length; i++) {
		var col = cols[i];
		//If the value exists…
		if (d[cols[i]]) {
			row[cols[i]] = +d[cols[i]];  //Convert from string to int
		} else {  //Otherwise…
			row[cols[i]] = 0;  //Set to zero
		}
	}
	return row;
}

var getDataUni = function(d, country, year, yearMin){
	return d[year - yearMin].data[country];
}

//Set up stack method
var stack = d3.stack()
			  //.order(d3.stackOrderDescending)  // <-- Flipped stacking order
;


//Load in data
d3.csv("data/Uni_data.csv", rowConverter, function(data) {
	dataset = data.slice(413,513); // SLICE HERE TO SEE FEWER YEAR
    //console.log(dataset);

	//Now that we know the column names in the data…
    countries = data.columns;
    //console.log(countries);
	countries.shift(); //Remove first column name ('Year')
	stack.keys(countries);  //Stack using what's left (the coutries)

	// var colorScale = d3.scaleSequential(d3.interpolateRainbow)
	// 					.domain([0, countries.length + 1]);


    //Data, stacked
	series = stack(dataset);
    //console.log(series);
	var yearMin = d3.min(dataset, function(d) { return d.year;});
	var yearMax = d3.max(dataset, function(d) { return d.year;});

// CHART ...

	//Create scale functions
    xScaleA = d3.scaleLinear()
                .domain([yearMin, yearMax])
				.range([p, w - p * 2]);

	yScaleA = d3.scaleLinear()
					.domain([
						0,
						d3.max(dataset, function(d) {
							var sum = 0;
							//Loops once for each row, to calculate
							//the total (sum) of sales of all countries
							for (var i = 0; i < countries.length; i++) {
											sum += d[countries[i]];
                                        };
                                        //console.log(sum);
                                        return sum;
									})
								])
								.range([h - p, p / 2])
								.nice();

	//Define axes
	xAxisA = d3.axisBottom()
			   .scale(xScaleA)
			   .ticks(10)
			   .tickFormat(d3.format(".0f"));

	//Define Y axis
	yAxisA = d3.axisRight()
			   .scale(yScaleA)
			   .ticks(10);

	//Define area generator
	area = d3.area()
				.x(function(d) { return xScaleA(d.data.year); })
				.y0(function(d) { return yScaleA(d[0]); })
				.y1(function(d) { return yScaleA(d[1]); });

	//Create SVG element
	var areaChart = d3.select("#stackedArea")
				.append("svg")
				.attr("id", "areachart" )
				.attr("width", w)
				.attr("height", h);

//	filter for continent
  d3.selectAll(".contCheckbox").on("change.st",updateStack);
  updateStack();

  function updateStack(){
    choices = [];
    d3.selectAll(".contCheckbox").each(function(d){
      cb = d3.select(this);
      if(cb.property("checked")){
        choices.push(cb.property("value"))
        console.log(choices);
			}
    });


	areaChart.selectAll("#allAreas").remove()

	//Create areas
	areaGroup = areaChart.selectAll("path")
		.data(series)
		.enter()
		.append("path")
		.attr("id", "allAreas")
		.filter(function(d) { return choices.includes(continents[d.key])})
		//.filter(function(d) { return continents[d.key] == "North America"})
		.attr("class", "area")
		.attr("d", area)
		.attr("fill", function(d, i) {
			console.log(colorScale(d));
			return colorScale(d);
		})
		.on('mouseover', function(d){
			activeCountry = d.key;
			//console.log(activeCountry);
			// highlight Area
			d3.select(this).classed("areaLight", true);

			// Make tooltip appear
			mousex = d3.mouse(this);
			mousex = mousex[0];
			var activeYear = Math.round(xScaleA.invert(mousex));
			//console.log(invertedx);
			uniNr = getDataUni(d, d.key, activeYear, yearMin);
			tooltipA.html( "<p>" + activeCountry + "<br>" + uniNr + "</p>" )
					  .classed("hidden", false);

			//update the map
			d3.selectAll(".country")
				.classed("country-on", function(d){
					if(d.properties.name == activeCountry) {
						//console.log(activeCountry);
						return true;}
					else return false;
				})
		}) // Finish .on mouseover

		.on('mouseout', function(d){
			d3.select(this).classed("areaLight", false);
			tooltipA.classed("hidden", true);

			// turn back the map
			d3.selectAll(".country-on")
				.attr("class", "country");
		}) // Finish .on mouseout
		;
		};

	//Create axes
	areaChart.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h - p) + ")")
		.call(xAxisA);

	areaChart.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (w - p * 2) + ",0)")
		.call(yAxisA);

	// Add moving vertical line
	var vertical = areaChart
	.append("line")
	.attr("id", "vertical")
	.classed("hidden", true)
	.attr("x1", xScaleA(yearMax) + 1)
	.attr("y1", p)
	.attr("x2", xScaleA(yearMax) + 1)
	.attr("y2", h - p)
	.style("stroke-width", 3)
	.style("stroke", "white")
	.style("fill", "none");

	areaChart
		.on("mousemove", function(){
	   		mousex = d3.mouse(this);
			mousex = mousex[0] + 5;
			vertical
				.classed("hidden", false)
				.attr("x1", mousex)
			   	.attr("x2", mousex)
		})
		.on("mouseover", function(){
			mousex = d3.mouse(this);
			mousex = mousex[0] + 5;
		 	vertical.attr("x1", mousex)
					.attr("x2", mousex)})
		.on("mouseout", function(){
			vertical.classed("hidden", true)
		});

// Finally...
});
