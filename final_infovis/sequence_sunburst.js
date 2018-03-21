// // data
// var nodeData = {"name": "World", "children": [{
//             "name": "Africa", "children": [
//               {"name": "Egypt", "children": [
//                 {"name": "religion", "size": 11},
//                 {"name": "science" , "size": 12}
//                 ]},
//               {"name": "Kenya", "children": [
//                   {"name": "science", "size": 2}
//                   ]},
//               {"name": "Lybia", "children": [
//                 {"name": "religion", "size": 2},
//                 {"name": "science", "size": 1}
//                 ]},
//               {"name": "Malawi", "children": [
//                   {"name": "science", "size":2}
//                   ]},
//               {"name": "Morocco", "children": [
//                   {"name": "science", "size" : 1}
//                   ]},
//               {"name": "Saudi Arabia", "children": [
//                       {"name": "religion", "size" : 1}
//                       ]},
//               {"name": "Algeria", "children": [
//                 {"name": "religion", "size": 1},
//                 {"name":"science", "size" : 1}
//                 ]},
//               {"name": "Sudan", "children": [
//                       {"name": "religion", "size" : 1}
//                       ]},
//               {"name": "South Africa", "children": [
//                 {"name": "religion", "size": 1},
//                 {"name": "science", "size" : 4}
//               ]},
//               {"name": "Tunisia", "children": [
//                       {"name": "religion", "size" : 1}
//                       ]}
//                     ]}, // end of Africa and Middle East
//
//                     {"name": "Europe", "children": [
//                           {"name": "Austria",  "children": [
//                             {"name": "religion", "size": 1},
//                             {"name": "science", "size": 23}
//                             ]},
//                           {"name": "Belarus", "children": [
//                               {"name": "science", "size" : 3}
//                               ]},
//                           {"name": "Belgium", "children": [
//                             {"name": "religion", "size": 1},
//                             {"name": "science", "size": 14}
//                             ]},
//                           {"name": "Bosnia and Herzegovina", "children": [
//                               {"name": "science", "size" : 1}
//                               ]},
//                           {"name": "Bulgaria", "children": [
//                               {"name": "science", "size" : 1}
//                               ]},
//                           {"name": "Croatia", "children": [
//                             {"name": "religion", "size" : 4},
//                             {"name": "science", "size"  : 5}
//                             ]},
//                           {"name": "Czech Republic", "children": [
//                             {"name": "religion", "size" : 3},
//                             {"name": "science", "size" : 11}
//                             ]},
//                           {"name": "Denmark", "children": [
//                               {"name": "science", "size" : 16}
//                               ]},
//                           {"name": "Estonia", "children": [
//                             {"name": "religion", "size": 1},
//                             {"name": "science", "size" : 2}
//                             ]},
//                           {"name": "Finland", "children": [
//                               {"name":"science", "size" : 6}
//                               ]},
//                           {"name": "France", "children": [
//                             {"name":"religion", "size": 30},
//                             {"name":"science", "size" : 135}
//                             ]},
//                           {"name": "Germany", "children": [
//                             {"name":"religion", "size": 12},
//                             {"name":"science", "size" : 165}
//                             ]},
//                           {"name": "Greece", "children": [
//                             {"name":"religion", "size": 7},
//                             {"name":"science", "size" : 3}
//                             ]},
//                           {"name": "Hungary", "children": [
//                             {"name":"religion", "size": 1},
//                             {"name":"science", "size" : 17}
//                             ]},
//                           {"name": "Ireland", "children": [
//                             {"name":"religion", "size": 2},
//                             {"name":"science", "size" : 6}
//                             ]},
//                           {"name": "Italy", "children": [
//                             {"name":"religion", "size": 230},
//                             {"name":"science", "size" : 47}
//                             ]},
//                           {"name": "Latvia", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "Lithuania", "children": [
//                               {"name":"science", "size" : 4}
//                               ]},
//                           {"name": "Luxembourg", "children": [
//                               {"name":"science", "size" : 2}
//                               ]},
//                           {"name": "Moldova", "children": [
//                               {"name":"science" , "size": 1}
//                               ]},
//                           {"name": "Montenegro", "children": [
//                               {"name":"religion", "size" : 1}
//                               ]},
//                           {"name": "Netherlands", "children": [
//                             {"name":"religion", "size": 1},
//                             {"name":"science", "size" : 29}
//                             ]},
//                           {"name": "Norway", "children": [
//                             {"name":"religion", "size": 1},
//                             {"name":"science", "size" : 12}
//                             ]},
//                           {"name": "Poland", "children": [
//                             {"name":"religion", "size": 4},
//                             {"name":"science", "size" : 44}
//                             ]},
//                           {"name": "Portugal", "children": [
//                             {"name":"religion", "size": 2},
//                             {"name":"science", "size" : 2}
//                             ]},
//                           {"name": "Romania", "children": [
//                             {"name":"religion", "size": 1},
//                             {"name":"science", "size" : 4}
//                             ]},
//                           {"name": "Russia", "children": [
//                               {"name":"science", "size" : 52}
//                               ]},
//                           {"name": "Slovakia", "children": [
//                             {"name":"religion", "size": 1},
//                             {"name":"science", "size" : 1}
//                             ]},
//                           {"name": "Slovenia", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "Spain", "children": [
//                             {"name":"religion", "size": 12},
//                             {"name":"science", "size" : 11}
//                             ]},
//                           {"name": "Sweden", "children": [
//                             {"name":"religion", "size": 3},
//                             {"name":"science", "size" : 22}
//                             ]},
//                           {"name": "Switzerland", "children": [
//                             {"name":"religion", "size": 2},
//                             {"name":"science", "size" : 26}
//                             ]},
//                           {"name": "Turkey", "children": [
//                               {"name":"religion", "size": 20},
//                               {"name":"science" , "size": 17}
//                               ]},
//                           {"name": "Ukraine", "children": [
//                               {"name":"science" , "size": 15}
//                               ]},
//                           {"name": "United Kingdom", "children": [
//                               {"name":"religion", "size": 12},
//                               {"name":"science", "size" : 188}
//                               ]}]
//                     }, // end of Europe
//
//                     {
//                         "name": "Asia", "children": [
//                           {"name": "Afghanistan", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "Azerbaijan", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "Armenia", "children": [
//                               {"name":"religion", "size" : 1}
//                               ]},
//                           {"name": "Bangladesh", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "China", "children": [
//                             {"name":"religion", "size": 2},
//                             {"name":"science", "size" : 11}
//                             ]},
//                           {"name": "Cyprus", "children": [
//                             {"name":"religion", "size": 1},
//                             {"name":"science", "size" : 1}
//                             ]},
//                           {"name": "Georgia", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "India", "children": [
//                             {"name":"religion", "size": 4},
//                             {"name":"science", "size" : 13}
//                             ]},
//                           {"name": "Indonesia", "children": [
//                               {"name":"science" , "size": 1}
//                               ]},
//                           {"name": "Iran", "children": [
//                             {"name":"religion", "size": 8},
//                             {"name":"science" , "size": 8}
//                             ]},
//                           {"name": "Iraq",  "children": [
//                             {"name":"religion", "size": 7},
//                             {"name":"science" , "size": 1}
//                             ]},
//                           {"name": "Israel", "children": [
//                             {"name":"religion", "size": 33},
//                             {"name":"science", "size" : 4}
//                             ]},
//                           {"name": "Japan", "children": [
//                               {"name":"science", "size" : 16}
//                               ]},
//                           {"name": "Jordan", "children": [
//                               {"name":"religion", "size" : 2}
//                               ]},
//                           {"name": "North Korea", "children": [
//                               {"name":"religion", "size" : 1}
//                               ]},
//                           {"name": "Pakistan", "children": [
//                             {"name":"religion", "size": 1},
//                             {"name":"science" , "size": 2}
//                             ]},
//                           {"name": "Palestine", "children": [
//                               {"name":"religion" , "size": 11}
//                               ]},
//                           {"name": "Saudi Arabia", "children": [
//                             {"name":"religion", "size": 10},
//                             {"name":"science", "size" : 2}
//                             ]},
//                           {"name": "South Korea", "children": [
//                               {"name":"science", "size" : 2}
//                               ]},
//                           {"name": "Sri Lanka", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "Syria", "children": [
//                               {"name":"religion", "size" : 7}
//                               ]},
//                           {"name": "Taiwan", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "Timor-Leste", "children": [
//                               {"name":"religion" , "size": 1}
//                               ]},
//                           {"name": "Uzbekistan", "children": [
//                               {"name":"religion" , "size": 1}
//                               ]},
//                           {"name": "Vietnam", "children": [
//                               {"name":"science" , "size": 1}
//                               ]},
//                           {"name": "Yemen", "children": [
//                               {"name":"religion", "size" : 2}
//                               ]}
//                             ]}, // end of Asia
//
//                             {"name": "North America", "children": [
//                           {"name": "United States", "children": [
//                             {"name":"religion", "size": 4},
//                             {"name":"science" , "size": 340}
//                             ]},
//                           {"name": "Canada",  "children": [
//                               {"name":"science", "size" : 19}
//                               ]},
//                           {"name": "Greenland", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "Haiti", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "Mexico", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "Saint Kitts and Nevis", "children": [
//                               {"name":"science", "size" : 1}
//                               ]},
//                           {"name": "Saint Lucia", "children": [
//                               {"name":"science", "size" : 1}
//                               ]}
//                             ]}, // end of North America
//
//                       {
//                         "name": "South America", "children": [
//                           {"name": "El Salvador", "children": [
//                               {"name":"religion", "size" : 1}
//                               ]},
//                           {"name": "Peru", "children": [
//                               {"name":"religion", "size" : 1}
//                               ]},
//                           {"name": "Brazil", "children": [
//                               {"name":"science", "size" : 3}
//                               ]},
//                           {"name": "Chile", "children": [
//                               {"name":"science" , "size": 1}
//                               ]},
//                           {"name": "Venezuela", "children": [
//                               {"name":"science" , "size": 1}
//                               ]},
//                           {"name": "Argentina", "children": [
//                               {"name":"science" , "size": 2}
//                               ]}
//                         ]}, // end of South America
//
//                     {"name": "Oceania", "children": [
//                           {"name": "Australia", "children": [
//                               {"name":"science" , "size": 13}
//                               ]},
//                           {"name": "New Zealand", "children": [
//                               {"name":"science" , "size": 3}
//                               ]}
//                       ]}
//
//
//                   ]};

// Dimensions of sunburst.
var width = $("#sunburst").width();
    height = $("#sunburst").height();
    radius = (Math.min(width, height) / 2) - 10;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
  w: 75, h: 20, s: 3, t: 10
};

// Mapping of step names to colors.
var colors = {
  "Europe": "red",
  "Asia": "#0066ff",
  "North America": "#3f903c",
  "South America": "darkorange",
  "Oceania": "#c51b8a",
  "Africa": "chocolate"
};

var color_arc = d3.scaleOrdinal(d3.schemeCategory20);

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0;

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.partition()
    .size([2 * Math.PI, radius * radius]);

var arc = d3.arc()
    .startAngle(function(d) { return d.x0; })
    .endAngle(function(d) { return d.x1; })
    .innerRadius(function(d) { return Math.sqrt(d.y0); })
    .outerRadius(function(d) { return Math.sqrt(d.y1); });

// Use d3.text and d3.csvParseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.
d3.text("./data/sequencesunburst_data.csv", function(text) {
  var csv = d3.csvParseRows(text);
  var json = buildHierarchy(csv);
  createVisualization(json);
});

// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  // Basic setup of page elements.
  initializeBreadcrumbTrail();
  drawLegend();
  // d3.select("#togglelegend").on("click", toggleLegend);

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // Turn the data into a d3 hierarchy and calculate the sums.
  var root = d3.hierarchy(json)
      .sum(function(d) { return d.size; });
      // .sort(function(a, b) { return b.value - a.value; });

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition(root).descendants()
      .filter(function(d) {
          return (d.x1 - d.x0 > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("class", "arc")
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) {
      if (d.data.name == "Europe") {
        return "red";
      } else if (d.data.name == "Asia") {
        return "#0066ff";
      } else if (d.data.name == "North America") {
        return "#3f903c";
      } else if (d.data.name == "South America") {
        return "orange";
      } else if (d.data.name == "Oceania") {
        return "#c51b8a";
      } else if (d.data.name == "Africa") {
        return "brown";
      } else if (d.data.name == "World") {
        return "white";
      } else if (d.data.name == "Science") {
        return "lightblue";
      } else if (d.data.name == "Religion") {
        return "yellow";
      }
      return color_arc((d.children ? d : d.parent).data.name);
      })
      .style("opacity", 1)
      .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#sunburst").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.datum().value;
 };

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {

  var percentage = (100 * d.value / totalSize).toPrecision(3);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }

  d3.select("#percentage")
      .text(percentageString)
      .style("visibility", "");

  d3.select("#explanation")
      .style("visibility", "")
      .text(percentageString);

  var sequenceArray = d.ancestors().reverse();
  sequenceArray.shift(); // remove root node from the array
  updateBreadcrumbs(sequenceArray, percentageString);

  // Fade all the segments.
  d3.selectAll(".arc")
      .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);

}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // // Deactivate all segments during transition.
  // d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll(".arc")
      .transition()
      .duration(100)
      .style("opacity", 0.1)
      // .on("end", function() {
      //         d3.select(this).on("mouseover", mouseover);
      //       });

  d3.select("#explanation")
      .style("visibility", "hidden");

  d3.select("#percentage")
      .style("visibility", "hidden");
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#chart").append("svg:svg")
      .attr("width", width)
      .attr("height", 100)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var trail = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.data.name + d.depth; });

  // Remove exiting nodes.
  trail.exit().remove();

  // Add breadcrumb and label for entering nodes.
  var entering = trail.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) {
      if (d.data.name == "Europe") {
        return "red";
      } else if (d.data.name == "Asia") {
        return "#0066ff";
      } else if (d.data.name == "North America") {
        return "#3f903c";
      } else if (d.data.name == "South America") {
        return "orange";
      } else if (d.data.name == "Oceania") {
        return "#c51b8a";
      } else if (d.data.name == "Africa") {
        return "brown";
      } else if (d.data.name == "World") {
        return "white";
      } else if (d.data.name == "Science") {
        return "lightblue";
      } else if (d.data.name == "Religion") {
        return "yellow";
      }
      return color_arc((d.children ? d : d.parent).data.name);
    });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.data.name; });


  // Merge enter and update selections; set position for all nodes.
  entering.merge(trail).attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}

function drawLegend() {

  // Dimensions of legend item: width, height, spacing, radius of rounded rect.
  var li = {
    w: 75, h: 30, s: 3, r: 3
  };

  var legend = d3.select("#legend").append("svg:svg")
      .attr("width", li.w)
      .attr("height", d3.keys(colors).length * (li.h + li.s));

  var g = legend.selectAll("g")
      .data(d3.entries(colors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
              return "translate(0," + i * (li.h + li.s) + ")";
           });

  g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) { return d.value; });

  g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.key; });
}

// function toggleLegend() {
//   var legend = d3.select("#legend");
//   if (legend.style("visibility") == "hidden") {
//     legend.style("visibility", "");
//   } else {
//     legend.style("visibility", "hidden");
//   }
// }

// Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how
// often that sequence occurred.
function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
 	var foundChild = false;
 	for (var k = 0; k < children.length; k++) {
 	  if (children[k]["name"] == nodeName) {
 	    childNode = children[k];
 	    foundChild = true;
 	    break;
 	  }
 	}
  // If we don't already have a child node for this branch, create it.
 	if (!foundChild) {
 	  childNode = {"name": nodeName, "children": []};
 	  children.push(childNode);
 	}
 	currentNode = childNode;
      } else {
 	// Reached the end of the sequence; create a leaf node.
 	childNode = {"name": nodeName, "size": size};
 	children.push(childNode);
      }
    }
  }
  return root;
};

d3.select(self.frameElement).style("height", height + "px");
