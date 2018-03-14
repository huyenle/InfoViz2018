function parse_Int(s){
	//return number from string 
	if (s){
		return parseInt(s);
	} else return 0;
}

var dataset = [];
var xScale, yScale, xAxis, yAxis, color, area;

var years = [];
var countries = [];
var nCountry;

// Settings
var w = 600;
var h = 400;
var p = 50;
var stack = d3.stack()
				.order(d3.stackOrderDescending);

d3.request("data/Uni3.csv")
	.mimeType("text/csv")
	.get(function(response) {

		// Load data

		var rows = d3.csvParseRows(response.responseText);
		//console.log(rows);

		for (var i = 1; i < rows[0].length; i++){
			var year = rows[0][i];
			years.push(parse_Int(year));
		};
		//console.log(years);

		for (var i = 0; i < rows.length - 1; i++){
			var row = rows[i + 1]; // first row is the years already

			var c = row[0];
			countries.push(c);

			dataset[i] = {
				country: c,
				nUni: []
			};
			
			for (var j = 1; j < row.length; j++){
				var n = parse_Int(row[j]);
				dataset[i].nUni.push(n);
			};
		};

		console.log(dataset);

		nCountry = dataset.length - 1;

		//Now that we know the column names in the data…
		var keys = countries;
		//keys.shift();  //Remove first column name ('Date')
		stack.keys(keys);  //Stack using what's left (the car names)

		//Data, stacked
		var series = stack(dataset);
		console.log(series);

		// CHART....

		// scales
		xScale = d3.scaleBand()
						.domain(years)
						.rangeRound([p, w - 2 * p]);

		yScale = d3.scaleLinear()
					.domain(d3.min(dataset[nCountry]), 
							d3.max(dataset[nCountry]))
					.range([h - p, p * 0.5 ])
					.nice();

		// color scale
		color = d3.scale.linear().domain([countries])
					.interpolate(d3.interpolateHcl)
					.range([d3.rgb("#007AFF"), d3.rgb('#FFF500')])
				  
		
		// axes
		xAxis = d3.axisBottom()
					.scale(xScale)
					.ticks(years.length);
				
		yAxis = d3.axisRight()
					.scale(yScale)
					.ticks(10);
				
		// area
		area = d3.area()
					.x(function(d){ return xScale(d.label); })
					.y0(function(d){ return yScale(d[0]); })
					.y1(function(d){ return yScale(d[1]); });

		// Create Svg object
		var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

		// Create areas for countries


	

});


