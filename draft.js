var pidxboth_ratio = {},
    pidxreligion_avg = {},
    pidxscience_avg = {},
    countPp_science = {};

for (i=0; i < dfscience.length; i++) {
    var currentCountry = dfscience[i].state 
    if (currentCountry===undefined) {continue}
    if (pidxscience_avg[currentCountry]===undefined) {            
        pidxscience_avg[currentCountry]=Number(dfscience[i].historical_popularity_index);
        countPp[currentCountry] = 1;
        }
    else {
        pidxscience_avg[dfscience[i].state]+=Number(dfscience[i].historical_popularity_index);
        countPp[currentCountry] += 1;};
}

for (i=0; i < )



// Alternative color
var colorBoth = d3.scaleSequential(d3.interpolateRdBu)
	.domain([0,d3.max(d3.values(pidxboth))]);
var colorScience = d3.scaleSequential(d3.interpolateBlues)
	.domain([0,d3.max(d3.values(pidxscience))])
var colorReligion = d3.scaleSequential(d3.interpolateReds)
    .domain([0,d3.max(d3.values(pidxreligion))]);	
            
        