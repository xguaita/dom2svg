var fs = require('fs'),
  d3 = require("d3");


// ************** Generate the tree diagram	 *****************
// Code modified from https://gist.github.com/d3noob/8323795, many thanks to Malcolm Maclean (d3noob)
exports.drawTree = function (source) {
  var margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    width = 1600 - margin.right - margin.left,
    height = 1200 - margin.top - margin.bottom;

  var i = 0; // node id

  var tree = d3.layout.tree()
    .size([height, width]);

  var diagonal = d3.svg.diagonal()
    .projection(function (d) {
      return [d.y, d.x];
    });

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //add css stylesheet
  var svg_style = svg.append("defs")
    .append('style')
    .attr('type', 'text/css');
  svg_style.text("<![CDATA[" + fs.readFileSync("./tree.css", "utf8") + "]]>");


  // Compute the new tree layout.
  var nodes = tree.nodes(source).reverse(),
    links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function (d) {
    d.y = d.depth * 120;
  });

  // Declare the nodes…
  var node = svg.selectAll("g.node")
    .data(nodes, function (d) {
      return d.id || (d.id = ++i);
    });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.y + "," + d.x + ")";
    });

  nodeEnter.append("circle")
    .attr("r", 6)
    .style("fill", "#fff");

  nodeEnter.append("text")
    .attr("x", function (d) {
      return d.children || d._children ? -13 : 13;
    })
    .attr("dy", ".35em")
    .attr("text-anchor", function (d) {
      return d.children || d._children ? "end" : "start";
    })
    .text(function (d) {
      return d.name;
    })
    .style("fill-opacity", 1);

  // Declare the links…
  var link = svg.selectAll("path.link")
    .data(links, function (d) {
      return d.target.id;
    });

  // Enter the links
  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", diagonal);

  return d3.select('body').html();
};
