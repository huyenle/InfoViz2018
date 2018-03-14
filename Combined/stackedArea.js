// I'm always hungry..
var dataset, xScale, yScale, xAxis, yAxis, area, series, areaGroup;
var countries;  //Empty, for now


// Settings
var w = 600;
var h = 300;
var p = 20;

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

//Set up stack method
var stack = d3.stack();
			  //.order(d3.stackOrderDescending);  // <-- Flipped stacking order

//Load in data
d3.csv("data/Uni_data.csv", rowConverter, function(data) {
	dataset = data.slice(413,513); // SLICE HERE TO SEE FEWER YEAR
    //console.log(dataset);	
     
	//Now that we know the column names in the data…
    countries = data.columns;
    //console.log(countries);
	countries.shift(); //Remove first column name ('Year')
	stack.keys(countries);  //Stack using what's left (the coutries)

	var colorScale = d3.scaleSequential(d3.interpolateRainbow)
						.domain([0, countries.length + 1]);

	//console.log(colorScale(90));
    
    //Data, stacked
	series = stack(dataset);
    //console.log(series);
	
	
// CHART ...

	//Create scale functions
    xScale = d3.scaleLinear()
                .domain([d3.min(dataset, function(d) { return d.year;}),
                        d3.max(dataset, function(d) { return d.year;})])
				.range([p, w - p * 2]);

	yScale = d3.scaleLinear()
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
	xAxis = d3.axisBottom()
			   .scale(xScale)
			   .ticks(10)
			   .tickFormat(d3.format(".0f"));

	//Define Y axis
	yAxis = d3.axisRight()
			   .scale(yScale)
			   .ticks(10);

	//Define area generator
	area = d3.area()
				.x(function(d) { return xScale(d.data.year); })
				.y0(function(d) { return yScale(d[0]); })
				.y1(function(d) { return yScale(d[1]); });

	//Create SVG element
	var areaChart = d3.select("#stackedArea")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	//Create areas
	areaGroup = areaChart.selectAll("path")
		.data(series)
		.enter()
		.append("path")
		.attr("class", "area")
		.attr("d", area)
		.attr("fill", function(d, i) {
			return colorScale(i);
		})
		.on('mouseover', function(d){
			activeCountry = d.key;
			//console.log(activeCountry);
			d3.select(this).classed("areaLight", true);

			mouse = d3.mouse(areaChart.node()).map( function(d) { return parseInt(d); } );
			tooltip.classed("hidden", false)
				.attr("style", "left:"+(mouse[0]+100)+"px;top:"+(mouse[1]+2*h)+"px")
				.html(activeCountry);

			//update the map
			d3.selectAll(".country")
				.classed("country-on", function(d){
					if(d.properties.name == activeCountry) return true;
					else return false;
				})
		}) // Finish .on mouseover

		.on('mouseout', function(d){
			d3.select(this).classed("areaLight", false);
			tooltip.classed("hidden", true);
			
			// turn back the map
			d3.selectAll(".country-on")
				.attr("class", "country");	
		}) // Finish .on mouseout
		;

	//Create axes
	areaChart.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h - p) + ")")
		.call(xAxis);

	areaChart.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (w - p * 2) + ",0)")
		.call(yAxis);
		
// Finally...
});
