		
		// DEFINE VARIABLES
		// Define size of map group
		// Full world map is 2:1 ratio
		// Using 12:5 because we will crop top and bottom of map
		wi = window.innerWidth;
		he = window.innerHeight;
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
					countriesaGroup = svgmap
			   .append("g")
			   .attr("id", "map")
				;

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
							.style("stroke-width","1px");
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
							.style("stroke-width","1px");
			
				if (Scientech.checked===false){
			d3.selectAll('#scienceattr')
			.style("fill","none")
			.style("stroke","none")
			}
			update(d3.select("#year").property("value"))
		
	    }	
	    }
		function updaterelig(){
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
							.style("stroke-width","1px");
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
							.style("stroke-width","1px");
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
			
			  var bounds = path.bounds(d);
			if (d.properties.name==='Russia'){bounds[0][0] = 1200} else if (d.properties.name==='France'){bounds[0][0] = 1008; bounds[1][1] = 304}
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
updatescienc();
updaterelig();

