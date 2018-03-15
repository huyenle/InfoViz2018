// DEFINE VARIABLES
		// Define size of map group
		// Full world map is 2:1 ratio
		// Using 12:5 because we will crop top and bottom of map
		w = 1800;
		h = 1000;
		var time=2018;
		var minZoom;
		var maxZoom;
		
		Relig.checked=true
		Scientech.checked=true
		//var selectionscience = True;
		//var selectionreligion = True;
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
		;
		
		var result = [];
		
		
		// get map data and popularity data 
		
		d3.queue()
		.defer(d3.json, "custom.geo.json")
		.defer(d3.csv, "updated.csv")
//		.defer(d3.csv, "religionwithgoodnames") // Load csv
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
			var df= csvdata.filter(function(d) {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]});
			var dfscience= csvdata.filter(function(d) {if(d.domain==='Science & Technology') {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]}});
			dfscience.forEach(function(dfscience){dfscience.color="blue"})
			var dfreligion= csvdata.filter(function(d) {if(d.industry==='Religion') {return [d.latitude, d.longitude, d.country, d.state, d.birth_year,d.full_name, d.historical_popularity_index]}});
			dfreligion.forEach(function(dfreligion){dfreligion.color="red"})
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
				countriesGroup = svg
			   .append("g")
			   .attr("id", "map")
				;
				
			// add a background rectangle
			countriesGroup
			   .append("rect")
			   .attr("x", 0)
			   .attr("y", 0)
			   .attr("width", w)
			   .attr("height", h)
			   .on("click", reset)
			;
			
			// draw a path for each feature/country
			countries = countriesGroup
			   .selectAll("path")
			   .data(json.features)
			   .enter()
			   .append("path")
			   .attr("d", path)
			   .style("stroke","white")
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
				return "rgb(" + color(this.r) +","+ color(0)+", " + color(this.s) + ")";})
			   .attr("class", "country")
				.on("click", clicked)
			
			var religipersons = countriesGroup
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
			var sciencepersons = countriesGroup
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
			d3.selectAll("text")
			//.style("fill",function(d){if (((year-d.birth_year)<100) && ((year-d.birth_year)>=0)) {return "black"} else {return "none"}})
			}
			
		function updatescienc(){
			if (Scientech.checked===false){
			d3.selectAll('#scienceattr')
			.style("fill","none")
			.style("stroke","none")
			}
			update(d3.select("#year").property("value"))
			/*d3.selectAll("path")
			.style('fill', function(d, pidxscience) {
				if (pidxscience[d.properties.iso_a3]===undefined){s=5000;}
				else{
					s=pidxscience[d.properties.iso_a3]**(0.35)/(d.properties.pop_est**0.3)*370000;}
				return "rgb(" + color(4000) +","+ color(0)+", " + color(s) + ")";})
*/
	    }
		function updaterelig(){
			if (Relig.checked===false){
			d3.selectAll('#religiattr')
			.style("fill","none")
			.style("stroke","none")
				} 
	    		update(d3.select("#year").property("value"))
			d3.selectAll("path")
			.style('fill', function(d) {
				s,r=colours(d)
				return "rgb(" + color(s) +","+ color(0)+", " + color(4000) + ")";})
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
		
	
			function ColourCountry(d,pidxreligion=pidxreligion, pidxscience=pidxscience,pidxboth=pidxboth) {
				if (pidxreligion[d.properties.iso_a3]===undefined){
			    r=4000;}
	    			if (pidxscience[d.properties.iso_a3]===undefined){
			    s=4000;}
	    			if (pidxboth[d.properties.iso_a3]===undefined){
			    r=4000; s=4000;}
				
	    if(pidxscience[d.properties.iso_a3]!==undefined){if (Scientech.checked===true){
	    s=pidxscience[d.properties.iso_a3]**(0.35)/(d.properties.pop_est**0.3)*370000;} else {s=4000}
	    			} 
	    if(pidxreligion[d.properties.iso_a3]!==undefined){if (Relig.checked===true){
	    r=pidxreligion[d.properties.iso_a3]**(0.35)/(d.properties.pop_est**0.3)*370000;
	    } else{r=4000}
	    			}
	    return s,r}		
		
		function reset() {
		active.classed("active", false);
		active = d3.select(null);
		
		countriesGroup.transition()
		.duration(750)
		.style("stroke-width", "1.5px")
		.attr("transform", "");
}
			
			update(time);
