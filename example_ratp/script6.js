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
var featurePointStation;

var transform = d3.geo.transform({point: projectPoint});
var path = d3.geo.path().projection(transform);

var rootWidth, previousWidth;



// var toPoint = d3.svg.append("circle")
//   .attr("cx", function (d){ return applyLatLngToLayer(d).x })
//   .attr("cy", function (d){ return applyLatLngToLayer(d).y });



function applyLatLngToLayer(d) {
  var point = map.latLngToLayerPoint(new L.LatLng(d[1], d[0]));

  console.log(point)
  return point;
  // console.log(point.x)

  // this.stream.point(point.x, point.y);

    // var y = d[1]
    // var x = d[0]

    // return map.latLngToLayerPoint(new L.LatLng(y, x))
}


  // featurePointStation = stationsGroup
  //   .selectAll(".centroid")
  //   .data(centroids)
  //   .enter()
  //   .append("circle")
  //   .attr("class", "centroid")
  //   .attr("fill", "red")
  //   .attr("stroke", "red")
  //   .attr("r", 10)
  //   .attr("d", path.pointRadius(function(d) {
  //         return
  //       }))
  //   .attr("cx", function (d){ return d[0]; })
  //   .attr("cy", function (d){ return d[1]; });


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
    .attr("d", path.pointRadius(function(d) {
      console.log(d, 'stations')
      return radius(d.properties.population) }))
    .style("fill", "gray")
    .style('stroke', 'white')

  // var centroids = stations.features.map((feature) => {

  //   return path.centroid(feature);
  // });
  var stationsFeatures = stations.features;
  var newStations = [...stationsFeatures];


  var centroids = newStations.map((feature) => {
    let newFeature = Object.assign({}, feature);
    let newCoordinates = [...feature.geometry.coordinates]
    let geom = Object.assign({}, feature['geometry'])

    geom.type = 'Point';
    newCoordinates = feature.properties.geo_point_2d.reverse();

    newFeature.geometry = geom;
    newFeature.geometry.coordinates = newCoordinates;


    return newFeature;
  })

  console.log(centroids, 'centroids')

  var featurePointStation = stationsGroup
      .selectAll(".centroids")
      .data(centroids)
      .enter()
      .append("path")
      .attr("class", "centroids")
      .attr("d", path.pointRadius(function(d) {
        console.log(d, 'centroids')
        return radius(d.properties.population) }))
      .style("fill", "red")
      .style("opacity", "1");




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

    featureStation.attr("d", path.pointRadius(function(d) {
      return radius(50)
    }));

    featurePointStation.attr("d", path.pointRadius(function(d) {
      return radius(1200)
    }));

    previousWidth = newWidth;


  }
}

// Use Leaflet to implement a D3 geometric transformation.
function projectPoint(x, y) {
  var point = map.latLngToLayerPoint(new L.LatLng(y, x));

  this.stream.point(point.x, point.y);
}



