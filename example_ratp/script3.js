queue()
  .defer(d3.json, "densite.json") // get stations.json
  .await(drawMap); // after get lines and stations call ready function

var map = L.map('map', {
  center: [48.853, 2.333],
  zoom: 14
});


function drawMap (error, metropoles) {
  // map.setView([31.75, 110], 4);
  // mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 17,
      id: 'mapbox.streets',
      accessToken: 'sk.eyJ1IjoicmVuYW5icm9uY2hhcnQiLCJhIjoiY2o5OW84enp2MHoyOTMzbndla3cyN3hrcCJ9.DdB659aMvccAu0B6ag8aJA'
  }).addTo(map);


  //HeatMap
  var geoData = [];
  // _.each(allDim.top(Infinity), function (d) {


  //     geoData.push([d["latitude"], d["longitude"], 1]);
  // });

  (metropoles).forEach(function (d) {
    geoData.push([d.fields.geo_point_2d[0], d.fields.geo_point_2d[1], d.fields.population]);
  })
  var heat = L.heatLayer(geoData,{
      radius: 10,
      blur: 20,
      maxZoom: 1,
  }).addTo(map);
}










// var map = L.map('map', {
//   center: [48.853, 2.333],
//   zoom: 14
// });







// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 17,
//     id: 'mapbox.streets',
//     accessToken: 'sk.eyJ1IjoicmVuYW5icm9uY2hhcnQiLCJhIjoiY2o5OW84enp2MHoyOTMzbndla3cyN3hrcCJ9.DdB659aMvccAu0B6ag8aJA'
// }).addTo(map);








// var svg = d3.select(map.getPanes().overlayPane).append("svg");
// // var linesGroup = svg.append("g").attr("class", "leaflet-zoom-hide");
// var stationsGroup = svg.append("g").attr("class", "leaflet-zoom-hide");
// var featureStation;
// // var featureLine;
// var transform = d3.geo.transform({point: projectPoint});
// var path = d3.geo.path().projection(transform);
// var rootWidth, previousWidth;
// // var div = d3.select("#rightbox");

// // Use Leaflet to implement a D3 geometric transformation.
// function projectPoint(x, y) {
//   var point = map.latLngToLayerPoint(new L.LatLng(y, x)); // transform geo coordinates in pixel point

//   this.stream.point(point.x, point.y);
// }


// queue()
//   .defer(d3.json, "stations.json") // get stations.json
//   .defer(d3.json, "lines.json") // get lines.json
//   .await(ready); // after get lines and stations call ready function

// function ready(error, stations, lines) {
//   // stations are ordered from the bigger one to the smaller one
//   // like that, smaller circle will be on the top of bigger ones


//   console.log(stations.features)




//   var radius = d3.scale.linear()
//     .domain([0, d3.max(stations.features, function(d) { return +d.properties.TRAFIC; })])
//     .range([2, 40]);



//   // A revoir


//   featureStation = stationsGroup.selectAll(".station")
//     .data(stations.features)
//     .enter()
//     .append("path")
//     .attr("class", "station")
//     .attr("id", (d) => `s${d.properties.ID}`)
//     .attr("d", path.pointRadius((d) => radius(d.properties.TRAFIC) ))
//     .style("fill", (d) => (d.properties.COLORS.includes('-') ? "#B8B8B8" : d.properties.COLORS) )
//     .style("z-index", (d) => Math.floor(50 - (d.properties.TRAFIC / 1000000)))
//     .style("opacity", (d) => (d.properties.COLORS.includes('-') ? "0.7" : "1"))

//   map.on("viewreset", reset);
//   reset();

//   // // Reposition the SVG to cover the features.
//   function reset(e) {
//     var zoom = e ? e.target._zoom : 20;
//     var offsetCard = 6*zoom;
//     var bounds = path.bounds(stations); // get the max value (left, top, right, bottom)
//                                         // of representation of path in pixel

//     console.log(offsetCard)
//     var topLeft = bounds[0];
//     var bottomRight = bounds[1];

//     svg.attr("width", (bottomRight[0] - topLeft[0]) + offsetCard)
//       .attr("height", (bottomRight[1] - topLeft[1]) + offsetCard)
//       .style("left", (topLeft[0] - (offsetCard/2)) + "px")
//       .style("top", (topLeft[1] - (offsetCard/2)) + "px")
//       .style('padding', `${offsetCard/2}px`);

//     stationsGroup.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

//     if (rootWidth === undefined) { // rootWidth means max range for stations radius = 50
//       rootWidth = bottomRight[0] - topLeft[0];
//       previousWidth = rootWidth;
//     }

//     var newWidth = bottomRight[0] - topLeft[0];
//     if (previousWidth != newWidth) {
//       radius.range([2, 40 * (newWidth / rootWidth)]);
//     }
//     featureStation.attr("d", path.pointRadius(function(d) { return radius(d.properties.TRAFIC) }));
//     previousWidth = newWidth;
//   }
// }

