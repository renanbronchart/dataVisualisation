var map = L.map('map').setView([48.853, 2.333], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'sk.eyJ1IjoicmVuYW5icm9uY2hhcnQiLCJhIjoiY2o5OW84enp2MHoyOTMzbndla3cyN3hrcCJ9.DdB659aMvccAu0B6ag8aJA'
}).addTo(map);

var svg = d3.select(map.getPanes().overlayPane).append("svg");
var stationsGroup = svg.append("g").attr("class", "leaflet-zoom-hide");

var featureStation;

var transform = d3.geo.transform({point: projectPoint});
var path = d3.geo.path().projection(transform);

var rootWidth, previousWidth;

// var div = d3.select("#rightbox");

queue()
  .defer(d3.json, "densite-metropole.json")
  .await(ready);

function ready(error, stations, lines) {
  // stations are ordered from the bigger one to the smaller one
  // like that, smaller circle will be on the top of bigger ones

  var radius = d3.scale.linear()
    .domain([0, d3.max(stations.features, function(d) { return +d.properties.population; })])
    .range([2, 50]);

  featureStation = stationsGroup.selectAll(".station")
    .data(stations.features)
    .enter()
    .append("path")
    .attr("class", "station")
    // .attr("d", path.pointRadius(function(d) { return radius(d.properties.population) }))
    .style("fill", "gray")
    .style('stroke', 'white')

  var centroids = stations.features.map((feature) => {

    return path.centroid(feature);
  });

  var featurePointStation = stationsGroup
    .selectAll(".centroid")
    .data(centroids)
    .enter()
    .append("circle")
    .attr("class", "centroid")
    .attr("fill", "red")
    .attr("stroke", "red")
    .attr("r", 10)
    .attr("cx", function (d){ return d[0]; })
    .attr("cy", function (d){ return d[1]; });




  function getBoundingBoxCenter (selection) {
    // get the DOM element from a D3 selection
    // you could also use "this" inside .each()
    var element = selection.node();
    // use the native SVG interface to get the bounding box
    var bbox = element.getBBox();
    // return the center of the bounding box
    return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
  }

  // console.log(centroids, 'centroid')
  // svg.append("g")
  //   .selectAll(".centroid")
  //   .data(centroids)
  //   .enter().append("circle")
  //     .attr("class", "centroid")
  //     .attr("fill", 'white')
  //     .attr("stroke", 'white')
  //     .attr("r", '10')
  //     .attr("cx", function (d){ return d[0]; })
  //     .attr("cy", function (d){ return d[1]; });

  map.on("viewreset", reset);
  reset();

  // Reposition the SVG to cover the features.
  function reset() {
    var bounds = path.bounds(stations);
    var topLeft = bounds[0];
    var bottomRight = bounds[1];

    svg.attr("width", bottomRight[0] - topLeft[0])
      .attr("height", bottomRight[1] - topLeft[1])
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");

    stationsGroup.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    if (rootWidth === undefined) { // rootWidth means max range for stations radius = 50
      rootWidth = bottomRight[0] - topLeft[0];
      previousWidth = rootWidth;
    }

    var newWidth = bottomRight[0] - topLeft[0];
    if (previousWidth != newWidth) {
      radius.range([2, 50 * (newWidth / rootWidth)]);
    }

    featureStation.attr("d", path.pointRadius(function(d) { return radius(d.properties.population) }));
    previousWidth = newWidth;


  }
}

// Use Leaflet to implement a D3 geometric transformation.
function projectPoint(x, y) {
  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
}



