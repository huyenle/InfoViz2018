var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 340 - margin.top - margin.bottom;

/*
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */

// setup x
var xValue = function(d) { return d.religpct;}, // data -> value
    xScale = d3.scaleLinear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.axisBottom(xScale);

// setup y
var yValue = function(d) { return d["uni_per_pop"];}, // data -> value
    yScale = d3.scaleLinear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis =  d3.axisRight(yScale);

// setup fill color
var cValue = function(d) { return d.country;};
var colorBubble =d3.scaleOrdinal(d3.schemeCategory10);


// add the graph canvas to the body of the webpage
var bubbles = d3.select("#bubbleChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);


// add the tooltip area to the webpage
var tooltipBubble = d3.select("bubbleChart").append("div")
    .attr("class", "tooltipBubble")
    .style("opacity", 0);



// load data
d3.csv("rel_uni_pop_hpi.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.country = d.name;
    d.year = +d.year;
    d.nr_unis = +d.nr_unis;
    d.nonreligpct = +d.nonreligpct * 100;
    d.religpct = +d.religpct * 100;
    d.uni_per_pop = +d.uni_per_pop;
    d.popsize = +d.popsize
    d.HPI_sci = +d.HPI_sci;
    d.HPI_rel = +d.HPI_rel;
    //console.log(d);
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-0.03, d3.max(data, yValue)+0.3]);

  // setup size of bubbles
  var scaleRadius = d3.scaleLinear()
            .domain([d3.min(data, function(d) { return d.popsize; }),
                    d3.max(data, function(d) { return d.popsize; })])
            .range([2,10]);


  // x-axis
  bubbles.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", 100)
      .style("text-anchor", "end")
      .text("Percentage religious");

  // y-axis
  bubbles.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of universities per 100.000 people");

  // draw dots
  bubbles.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .filter(function(d) { return d.year == 2010 })
      .attr("class", "dot")
      .attr("cx", xMap)
      .attr("cy", yMap)
      .attr('r', function(d) { return scaleRadius(d.popsize)})
      .style("fill", function(d,i) { return colorBubble(i);})
      .on("mouseover", function(d) {
          tooltipBubble.transition()
               .duration(200)
               .style("opacity", .9);
          tooltipBubble.html(d["country"] + " in " + d["year"] + "<br/> (" + xValue(d)
	        + "% religious, " + yValue(d) + " universities)")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
});
