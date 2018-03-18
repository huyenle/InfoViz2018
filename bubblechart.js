var margin = {top: 20, right: 20, bottom: 20, left: 10},
    width = $("#bubbleChart").width(),
    height = $("#bubbleChart").height();

// setup x
var xValue = function(d) { return d.year + Math.random() *2 -1 ;}, // data -> value
    xScaleB = d3.scaleLinear().range([margin.left, width-margin.left*2]), // value -> display
    xMap = function(d) { return xScaleB(xValue(d));}, // data -> display
    xAxis = d3.axisBottom()
              .scale(xScaleB)
              .tickFormat(d3.format("d"));

// setup y
var yValue = function(d) { return d.religpct;}, // data -> value
    yScaleB = d3.scaleLinear().range([height, margin.bottom]), // value -> display
    yMap = function(d) { return yScaleB(yValue(d));}, // data -> display
    yAxis =  d3.axisRight()
                .scale(yScaleB)
                .ticks(10);


// add the graph canvas to the body of the webpage
var bubbles = d3.select("#bubbleChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);


// add the tooltip area to the webpage
var tooltip = d3.select("#bubbleChart").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);



// load data
d3.csv("./data/rel_uni_pop_hpi.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.country = d.name;
    d.year = +d.year;
    d.nr_unis = +d.nr_unis;
    d.nonreligpct = +d.nonreligpct * 100;
    d.religpct = +d.religpct * 100;
    d.uni_per_pop = +d.uni_per_pop;
    d.continent = d.continent;
    d.popsize = +d.popsize;
    //console.log(d);
  });

  xScaleB.domain([d3.min(data, xValue)-2, d3.max(data, xValue)+3]);
  yScaleB.domain([0, d3.max(data, yValue)+3]);

  // size of bubbles
  var scaleRadius = d3.scaleLinear()
            .domain([d3.min(data, function(d) { return d.popsize; }),
                    d3.max(data, function(d) { return d.popsize; })])
            .range([4,10]);


  // x-axis
  bubbles.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

      // text label
  bubbles.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Year");

  // y-axis
  bubbles.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ",0)")
      .call(yAxis)

      // text label
  bubbles.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", width+13)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font", "12px")
      .text("Percentage of pupulation that is religious");

  // draw dots


  bubbles.selectAll("path")
      .data(data)
    .enter().append("circle")
    //  .filter(function(d) { return d.country == activeCountry })
      .attr("class", "bubbles")
      .attr("d", bubbles)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .attr('r', function(d) { return scaleRadius(d.popsize)})
      .style("fill", function(d) {
        if (d.continent == "Europe") {
          return "red";
        } else if (d.continent == "Asia") {
          return "blue";
        } else if (d.continent == "North America") {
          return "green";
        } else if (d.continent == "South America") {
          return "orange";
        } else if (d.continent == "Oceania") {
          return "purple";
        } else if (d.continent == "Africa") {
          return "lightblue";
        }
        return "black";
        })
      .on("mouseover", function(d) {
          activeCountry = d.country
          console.log(activeCountry);

          d3.select(this).classed("bubblesLight", true);
          tooltip.html(d["country"] + " in " + d["year"] + "<br/> ("
            + yValue(d) + "% religious)")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
          d3.selectAll(".country")
         				.classed("country-on", function(d){
         					if(d.properties.name == activeCountry) return true;
         					else return false;
         				})
      })
      .on('mouseout', function(d){
        d3.select(this).classed("bubblesLight", false);
        tooltip.classed("hidden", true);

       // turn back the map
 			  d3.selectAll(".country-on")
 				.attr("class", "country");
      });
});
