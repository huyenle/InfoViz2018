		
		// DEFINE VARIABLES
		// Define size of map group
		// Full world map is 2:1 ratio
		// Using 12:5 because we will crop top and bottom of map
		wi =$("#map-holder").width();
		he = $("#map-holder").height();
		var time=2018;
		var minZoom;
		var maxZoom;
		
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
		var colora=d3.scaleLinear().domain([0,15000]).range([0,255]);
		
		
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
		
	
svgmap.append("defs")
.append("linearGradient")
.attr("id", "legendGradientMulti")
.attr("x1", "0%").attr("y1", "0%")
.attr("x2", "100%").attr("y2", "0%")
.selectAll("stop")
.data([
{offset: "0%", color: "#2c7bb6"},
{offset: "12.5%", color: "#00a6ca"},
{offset: "25%", color: "#00ccbc"},
{offset: "37.5%", color: "#90eb9d"},
{offset: "50%", color: "#ffff8c"},
{offset: "62.5%", color: "#f9d057"},
{offset: "75%", color: "#f29e2e"},
{offset: "87.5%", color: "#e76818"},
{offset: "100%", color: "#d7191c"} ])
.enter().append("stop")
.attr("offset", function(d) { return d.offset; })
.attr("stop-color", function(d) { return d.color; });

svgmap.append("rect")
.attr("x", 0).attr("y", 0)
.attr("width", wi).attr("height", he)
.style("fill", "url(#legendGradientMulti)");
var ylegend = he*1/2
var xlegend = wi*40/2000
var hlegend = he*1/4

var scigradient = svgmap.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "scigradient")
    .attr("x1", "100%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

// Define the gradient colors
scigradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "rgb(68,0,0)")
    .attr("stop-opacity", 1);

scigradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "rgb(68,0,255)")
    .attr("stop-opacity", 1);

var scilegend = svgmap.append('rect').attr('id','scilegend')
var scilegendattr = scilegend.attr('x',0.5*hlegend+xlegend-0.1*hlegend).attr('y',ylegend).attr('height',hlegend).attr('width',0.2*hlegend).style('fill','url(#scigradient)').style('stroke','black').style('stroke-width','2px').style('opacity',function(){if(Scientech.checked===true && Relig.checked===false){return 1} else {return 0}})

var relgradient = svgmap.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "relgradient")
    .attr("x1", "100%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

// Define the gradient colors
relgradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "rgb(0,0,68)")
    .attr("stop-opacity", 1);

relgradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "rgb(255,0,68)")
    .attr("stop-opacity", 1);

var rellegend = svgmap.append('rect').attr('id','rellegend')
var rellegendattr = rellegend.attr('x',0.5*hlegend+xlegend-0.1*hlegend).attr('y',ylegend).attr('height',hlegend).attr('width',0.2*hlegend).style('fill','url(#relgradient)').style('stroke','black').style('stroke-width','2px').style('opacity',function(){if(Scientech.checked===true && Relig.checked===false){return 1} else {return 0}})

var bothgradient = svgmap.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "bothgradient")
    .attr("x1", "100%")
    .attr("y1", "100%")
    .attr("x2", "0%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

var bothgradientb = svgmap.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "bothgradientb")
    .attr("x1", "100%")
    .attr("y1", "100%")
    .attr("x3", "0%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");


var bothgradienta = svgmap.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "bothgradienta")
    .attr("x2", "100%")
    .attr("y1", "100%")
    .attr("x1", "0%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

// Define the gradient colors
bothgradient.append("svg:stop")
    .attr("offset", "50%")
    .attr("stop-color", "rgb(0,0,68)")
    .attr("stop-opacity", 1);


bothgradient.append("svg:stop")
    .attr("offset", "75%")
    .attr("stop-color", "rgb(255,0,68)")
    .attr("stop-opacity", 1);

bothgradienta.append("svg:stop")
    .attr("offset", "50%")
    .attr("stop-color", "rgb(68,0,0)")
    .attr("stop-opacity", 1);


bothgradienta.append("svg:stop")
    .attr("offset", "75%")
    .attr("stop-color", "rgb(68,0,255)")
    .attr("stop-opacity", 1);

 bothgradientb.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "rgb(68,0,68)")
    .attr("stop-opacity", 1);


bothgradientb.append("svg:stop")
    .attr("offset", "110%")
    .attr("stop-color", "rgb(255,255,255)")
    .attr("stop-opacity", 1);

   
svgmap.append('polyline').attr("fill",'url(#bothgradientb)').attr("id","bothlegendb")
    .attr('points', xlegend+", "+ylegend+" "+(hlegend+xlegend)+", "+ylegend+" "+(0.5*hlegend+xlegend)+", "+(hlegend+ylegend))
    .style('stroke','black')
	.style('stroke-width','2px')
.style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 1} else {return 0}});
	
svgmap.append('polyline').attr("fill",'url(#bothgradient)').attr("id","bothlegend")
    .attr('points', xlegend+", "+ylegend+" "+(hlegend+xlegend)+", "+ylegend+" "+(0.5*hlegend+xlegend)+", "+(hlegend+ylegend))
    .style('stroke','black')
	.style('stroke-width','2px')
.style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 0.5} else {return 0}});

svgmap.append('polyline').attr("fill",'url(#bothgradienta)').attr("id","bothlegenda")
    .attr('points', xlegend+", "+ylegend+" "+(hlegend+xlegend)+", "+ylegend+" "+(0.5*hlegend+xlegend)+", "+(hlegend+ylegend))
    .style('stroke','black')
	.style('stroke-width','2px')
.style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 0.5} else {return 0}});

texsize = wi/2000*30

svgmap.append('text')
.attr('x',xlegend*1.1)
.attr('id','legendtext')
.attr('y',1.5*ylegend+texsize)
.style('font-size',texsize+'px')
.style('opacity',function(){if(Scientech.checked===true || Relig.checked===true){return 1} else {return 0}})
.style('opacity',function(){if(Scientech.checked===true || Relig.checked===true){return 1} else {return 0}})
.text(function(){if(Scientech.checked===true && Relig.checked===true){return 'No famous scientific/religious persons'}else if(Scientech.checked===true && Relig.checked===false){return 'No famous scientific persons'}else if(Scientech.checked===false && Relig.checked===true){return 'No famous religious persons'}else{return '-'}});	

svgmap.append('text')
.attr('x',0.5*texsize)
.attr('id','upperlegendtext')
.attr('y',ylegend-texsize)
.style('font-size',texsize+'px')
.style('opacity',function(){if((Scientech.checked===true && Relig.checked===false)|| (Relig.checked===true && Scientech.checked===false)){return 1} else {return 0}})
.style('opacity',function(){if(Scientech.checked===true || Relig.checked===true){return 1} else {return 0}})
.text(function(){if(Scientech.checked===true && Relig.checked===true){return 'Religion'}else if(Scientech.checked===true && Relig.checked===false){return 'Most famous scientific persons'}else if(Scientech.checked===false && Relig.checked===true){return 'Most famous religious persons'}else{return '-'}});	

svgmap.append('text')
.attr('x',hlegend+xlegend-2*texsize)
.attr('id','upperrightlegendtext')
.attr('y',ylegend-texsize)
.style('font-size',texsize+'px')
.style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 1} else {return 0}})
.text(function(){if(Scientech.checked===true && Relig.checked===true){return 'Science'}else if(Scientech.checked===true && Relig.checked===false){return 'Most famous scientific persons'}else if(Scientech.checked===false && Relig.checked===true){return 'Most famous religious persons'}else{return '-'}});	


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
			d3.selectAll("text")
			//.style("fill",function(d){if (((year-d.birth_year)<100) && ((year-d.birth_year)>=0)) {return "black"} else {return "none"}})
			}
			
		function updatescienc(){
d3.select('#scilegend').style('opacity',function(){if(Scientech.checked===true && Relig.checked===false){return 1} else {return 0}})
d3.select('#rellegend').style('opacity',function(){if(Scientech.checked===false && Relig.checked===true){return 1} else {return 0}})
d3.select('#bothlegend').style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 0.5} else {return 0}});
d3.select('#bothlegendb').style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 1} else {return 0}});
d3.select('#bothlegenda').style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 0.5} else {return 0}});
d3.select('#legendtext').style('opacity',function(){if(Scientech.checked===true || Relig.checked===true){return 1} else {return 0}}).text(function(){if(Scientech.checked===true && Relig.checked===true){return 'No famous scientific/religious persons'}else if(Scientech.checked===true && Relig.checked===false){return 'No famous scientific persons'}else if(Scientech.checked===false && Relig.checked===true){return 'No famous religious persons'}else{return '-'}});
d3.select('#upperlegendtext').style('opacity',function(){if((Scientech.checked===true && Relig.checked===false)|| (Relig.checked===true && Scientech.checked===false)){return 1} else {return 0}})
.style('opacity',function(){if(Scientech.checked===true || Relig.checked===true){return 1} else {return 0}})
.text(function(){if(Scientech.checked===true && Relig.checked===true){return 'Religion'}else if(Scientech.checked===true && Relig.checked===false){return 'Most famous scientific persons'}else if(Scientech.checked===false && Relig.checked===true){return 'Most famous religious persons'}else{return '-'}});	
d3.select('#upperrightlegendtext').style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 1} else {return 0}})


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
			var dfboth= csvdata.filter(function(d) {if(d.industry==='Religion'||d.domain==='Science & Technology') {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]}});
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
					}

				

			
			// draw a path for each feature/country
			countriesa = countriesaGroup
			   .selectAll("path")
			   .data(json.features)
			   .enter()
			   .append("path")
			   .attr("d", path)
				.style("stroke-width","3px")
			   .style("stroke",function(d){if(d.properties.continent==='Europe'){return 'red'} else if (d.properties.continent==='Asia'){return 'blue'} else if (d.properties.continent==='North America'){return 'green'} else if (d.properties.continent==='South America'){return 'orange'} else if (d.properties.continent==='Africa'){return 'lightblue'} else if (d.properties.continent==='Oceania') {return 'purple'} else {return 'white'}})
			.style("opacity",0.8)
			.style("stroke-opacity",0.4)
			   .attr("id", function(d, i) {
				  return d.properties.iso_a3;})
			   .style('fill', function(d) {
				if (pidxreligion[d.properties.iso_a3]===undefined){
			    this.r=4000;}
	    			if (pidxscience[d.properties.iso_a3]===undefined){
			    this.s=4000;}
	    			if (pidxboth[d.properties.iso_a3]===undefined){
			    this.r=4000; this.s=4000;}
				
	    if(pidxscience[d.properties.iso_a3]!==undefined){if (Scientech.checked===true){
	    this.s=pidxscience[d.properties.iso_a3]**(0.35)/(d.properties.pop_est**0.3)*370000;} else {this.s=4000}
	    			} 
	    if(pidxreligion[d.properties.iso_a3]!==undefined){if (Relig.checked===true){
	    this.r=pidxreligion[d.properties.iso_a3]**(0.35)/(d.properties.pop_est**0.3)*370000;
	    } else{this.r=4000}
	    			}
				return "rgb(" + colora(this.r) +","+ colora(0)+", " + colora(this.s) + ")";})
			   .attr("class", "country")
				.on("click", clicked)
				.on('mouseover', function(d){ // mouse over effect -- Huyen
					activeCountry = d.properties.name;
					d3.select(this).classed("country-on", true);
			
					mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
		
					// Update the stacked area chart
					d3.selectAll(".area")
						.classed("areaLight", function(d){
							if(d.key == activeCountry) {//console.log(d.key);
														return true; }
							else return false;
						   });
				})//end of mouseover

				.on("mouseout", function(d){ //mouse out effect -- Huyen
					d3.select(this).classed("country-on", false);
		
					// turn back the stacked area map
					d3.selectAll(".areaLight")
						.attr("class", "area");
			   }) // end of mouseout
		
			
			var religipersons = countriesaGroup
						.selectAll("circle")
						.data(dfreligion)
						.enter()
						.append("circle");
					
					
			var religiattr = religipersons
							.attr("id","religiattr")
							.attr("r", 3)
							.attr("transform", function(d) {return "translate(" + projection([d.longitude, d.latitude]) + ")";})
							.attr("domaincol","red")
							.style("fill",function(d){if (time>=d.birth_year && time<=d.birth_year+100 && Relig.checked===true) {return 'darkred'} else {return "none"}})
							//.style("opacity",0.6)
							.style("stroke",function(d){if (time>=d.birth_year && time<=d.birth_year+100 && Relig.checked===true) {return "pink"} else {return "none"}})
.on('click',function(d){alert(d.full_name)})
							//.style("stroke-width","1px");
			var sciencepersons = countriesaGroup
						.selectAll("circle")
						.data(dfscience)
						.enter()
						.append("circle");
					
					
			var scienceattr = sciencepersons
							.attr("id","scienceattr")
							.attr("r", 3)
							.attr("transform", function(d) {return "translate(" + projection([d.longitude, d.latitude]) + ")";})
							.attr("domaincol","blue")
							//.style("opacity",0.6)
							.style("stroke",function(d){if (time>=d.birth_year && time<=d.birth_year+100 && Scientech.checked===true) {return "skyblue"} else {return "none"}})
							.style("stroke-width","1px")
.on('click',function(d){alert(d.full_name)});			

				if (Scientech.checked===false){
			d3.selectAll('#scienceattr')
			.style("fill","none")
			.style("stroke","none")
			}
			update(d3.select("#year").property("value"))
		
	    }	
	    }
		function updaterelig(){
d3.select('#scilegend').style('opacity',function(){if(Scientech.checked===true && Relig.checked===false){return 1} else {return 0}})
d3.select('#rellegend').style('opacity',function(){if(Scientech.checked===false && Relig.checked===true){return 1} else {return 0}})
d3.select('#bothlegend').style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 0.5} else {return 0}});
d3.select('#bothlegendb').style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 1} else {return 0}});
d3.select('#bothlegenda').style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 0.5} else {return 0}});
d3.select('#legendtext').style('opacity',function(){if(Scientech.checked===true || Relig.checked===true){return 1} else {return 0}}).text(function(){if(Scientech.checked===true && Relig.checked===true){return 'No famous scientific/religious persons'}else if(Scientech.checked===true && Relig.checked===false){return 'No famous scientific persons'}else if(Scientech.checked===false && Relig.checked===true){return 'No famous religious persons'}else{return '-'}});
d3.select('#upperlegendtext').style('opacity',function(){if((Scientech.checked===true && Relig.checked===false)|| (Relig.checked===true && Scientech.checked===false)){return 1} else {return 0}})
.style('opacity',function(){if(Scientech.checked===true || Relig.checked===true){return 1} else {return 0}})
.text(function(){if(Scientech.checked===true && Relig.checked===true){return 'Religion'}else if(Scientech.checked===true && Relig.checked===false){return 'Most famous scientific persons'}else if(Scientech.checked===false && Relig.checked===true){return 'Most famous religious persons'}else{return '-'}});	
d3.select('#upperrightlegendtext').style('opacity',function(){if(Scientech.checked===true && Relig.checked===true){return 1} else {return 0}})


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

			var df= csvdata.filter(function(d) {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]});
			var dfscience= csvdata.filter(function(d) {if(d.domain==='Science & Technology') {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]}});
			dfscience.forEach(function(dfscience){dfscience.colora="blue"})
			var dfreligion= csvdata.filter(function(d) {if(d.industry==='Religion') {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]}});
			dfreligion.forEach(function(dfreligion){dfreligion.colora="red"})
			var dfboth= csvdata.filter(function(d) {if(d.industry==='Religion'||d.domain==='Science & Technology') {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]}});
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
					
			var pidxscience={};
					
					
			//POPULARITY INDEX PER COUNTRY
			for (i=0; i<dfscience.length; i++) {
				if (dfscience[i].state===undefined) {continue}
				if (pidxscience[dfscience[i].state]===undefined) {
							
					pidxscience[df[i].state]=Number(dfscience[i].historical_popularity_index);
					}
				else {
					pidxscience[dfscience[i].state]+=Number(dfscience[i].historical_popularity_index);}
					}
			
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
					}


			// draw a path for each feature/country
			countriesa = countriesaGroup
			   .selectAll("path")
			   .data(json.features)
			   .enter()
			   .append("path")
			   .attr("d", path)
				.style("stroke-width","3px")
			   .style("stroke",function(d){if(d.properties.continent==='Europe'){return 'red'} else if (d.properties.continent==='Asia'){return 'blue'} else if (d.properties.continent==='North America'){return 'green'} else if (d.properties.continent==='South America'){return 'orange'} else if (d.properties.continent==='Africa'){return 'lightblue'} else{return 'purple'}})
			.style("opacity",0.8)
			.style("stroke-opacity",0.4)
			   .attr("id", function(d, i) {
				  return d.properties.iso_a3;})
			   .style('fill', function(d) {
				if (pidxreligion[d.properties.iso_a3]===undefined){
			    this.r=4000;}
	    			if (pidxscience[d.properties.iso_a3]===undefined){
			    this.s=4000;}
	    			if (pidxboth[d.properties.iso_a3]===undefined){
			    this.r=4000; this.s=4000;}
				
	    if(pidxscience[d.properties.iso_a3]!==undefined){if (Scientech.checked===true){
	    this.s=pidxscience[d.properties.iso_a3]**(0.35)/(d.properties.pop_est**0.3)*370000;} else {this.s=4000}
	    			} 
	    if(pidxreligion[d.properties.iso_a3]!==undefined){if (Relig.checked===true){
	    this.r=pidxreligion[d.properties.iso_a3]**(0.35)/(d.properties.pop_est**0.3)*370000;
	    } else{this.r=4000}
	    			}
				return "rgb(" + colora(this.r) +","+ colora(0)+", " + colora(this.s) + ")";})
			   .attr("class", "country")
				.on("click", clicked)
			
			var religipersons = countriesaGroup
						.selectAll("circle")
						.data(dfreligion)
						.enter()
						.append("circle");
					
					
			var religiattr = religipersons
							.attr("id","religiattr")
							.attr("r", 3)
							.attr("transform", function(d) {return "translate(" + projection([d.longitude, d.latitude]) + ")";})
							.attr("domaincol","red")
							.style("fill",function(d){if (time>=d.birth_year && time<=d.birth_year+100 && Relig.checked===true) {return 'darkred'} else {return "none"}})
							//.style("opacity",0.6)
							.style("stroke",function(d){if (time>=d.birth_year && time<=d.birth_year+100 && Relig.checked===true) {return "pink"} else {return "none"}})
							.style("stroke-width","1px")
.on('click',function(d){alert(d.full_name)});

			var sciencepersons = countriesaGroup
						.selectAll("circle")
						.data(dfscience)
						.enter()
						.append("circle");
					
					
			var scienceattr = sciencepersons
							.attr("id","scienceattr")
							.attr("r", 3)
							.attr("transform", function(d) {return "translate(" + projection([d.longitude, d.latitude]) + ")";})
							.attr("domaincol","blue")
							//.style("opacity",0.6)
							.style("stroke",function(d){if (time>=d.birth_year && time<=d.birth_year+100 && Scientech.checked===true) {return "skyblue"} else {return "none"}})
							.style("stroke-width","1px")
.on('click',function(d){alert(d.full_name)});

			if (Relig.checked===false){
			d3.selectAll('#religiattr')
			.style("fill","none")
			.style("stroke","none")
				} 
	    		update(d3.select("#year").property("value"))
			
			
	    }				}
	    
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
		
		
			// Update the sunburst area chart by highlighting the country clicked
			activeCountry = d.properties.name;
			d3.selectAll(".arc")
			  .on("click", click)
				.classed("arcLight", function(d){
					if(d.data.name == activeCountry) {//console.log(d.data.name);
												return true; }
					else return false;
					 });
		
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
updatescienc();
updaterelig();

