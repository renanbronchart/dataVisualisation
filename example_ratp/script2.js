var map = L.map('map').setView([48.853, 2.333], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'sk.eyJ1IjoicmVuYW5icm9uY2hhcnQiLCJhIjoiY2o5OW84enp2MHoyOTMzbndla3cyN3hrcCJ9.DdB659aMvccAu0B6ag8aJA'
}).addTo(map);

var svg = d3.select(map.getPanes().overlayPane).append("svg");
  var linesGroup = svg.append("g").attr("class", "leaflet-zoom-hide");
  var stationsGroup = svg.append("g").attr("class", "leaflet-zoom-hide");

var featureStation, featureLine;

var transform = d3.geo.transform({point: projectPoint});
var path = d3.geo.path().projection(transform);

var rootWidth, previousWidth;

// var div = d3.select("#rightbox");

queue()
  .defer(d3.json, "stations.json")
  .defer(d3.json, "lines.json")
  .await(ready);

function ready(error, stations, lines) {
  // stations are ordered from the bigger one to the smaller one
  // like that, smaller circle will be on the top of bigger ones

  var radius = d3.scale.linear()
    .domain([0, d3.max(stations.features, function(d) { return +d.properties.TRAFIC; })])
    .range([2, 50]);

  featureStation = stationsGroup.selectAll(".station")
    .data(stations.features)
    .enter().append("path")
    .attr("class", "station")
    .attr("id", function(d){ return "s" + d.properties.ID; })
    .attr("d", path.pointRadius(function(d) { return radius(d.properties.TRAFIC) }))
    .style("fill", function(d) { return (d.properties.COLORS.indexOf('-') > 0 ? "#B8B8B8" : d.properties.COLORS); })
    .style("z-index", function(d){ return Math.floor(50 - (d.properties.TRAFIC / 1000000)); })
    .style("opacity", function(d) { return (d.properties.COLORS.indexOf('-') > 0 ? "0.7" : "1"); })
    .on("mouseover", function(d) {
      // div.html('<div class="box-title">Informations</div></br>'
      //     +  'Station : <span style="font-weight:bold;">' + d.properties.STATION
      //     +  '</span><br/>Ville : <span style="font-weight:bold;">' + d.properties.CITY + ' ' + d.properties.QUARTER
      //     // http://stackoverflow.com/questions/10809136/how-to-format-numbers-with-white-spaces-between-thousands
      //     +  '</span><br/>Trafic : <span style="font-weight:bold;">' + ("" + d.properties.TRAFIC).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      //     +  '</span><br/>Lignes : ' + getLines(d));

      var lines = d.properties.LINES.split('-');
      for (i = 0; i < lines.length; ++i) {
        d3.selectAll('#l' + lines[i]).style("stroke", "black");
      }
    })
    .on("mouseout", function(d) {
      var lines = d.properties.LINES.split('-');
      var colors = d.properties.COLORS.split('-');
      for (i = 0; i < lines.length; ++i) {
        d3.selectAll('#l' + lines[i]).style("stroke", colors[i]);
      }
    });

  featureLine = linesGroup.selectAll("lines")
    .data(lines.features)
    .enter()
    .append("path")
    .attr('class', 'line')
    .attr('id', function(d) { return 'l' + d.properties.LINE; })
    .attr("d", path)
    .style("stroke", function(d) { return d.properties.COLOR; });

  map.on("viewreset", reset);
  reset();

  // Reposition the SVG to cover the features.
  function reset() {
    var bounds = path.bounds(stations),
      topLeft = bounds[0],
      bottomRight = bounds[1];

    svg.attr("width", bottomRight[0] - topLeft[0])
      .attr("height", bottomRight[1] - topLeft[1])
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");

    linesGroup.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
    stationsGroup.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    featureLine.attr("d", path);

    if (rootWidth === undefined) { // rootWidth means max range for stations radius = 50
      rootWidth = bottomRight[0] - topLeft[0];
      previousWidth = rootWidth;
    }

    var newWidth = bottomRight[0] - topLeft[0];
    if (previousWidth != newWidth) {
      radius.range([2, 50 * (newWidth / rootWidth)]);
    }
    featureStation.attr("d", path.pointRadius(function(d) { return radius(d.properties.TRAFIC) }));
    previousWidth = newWidth;
  }
}

// Use Leaflet to implement a D3 geometric transformation.
function projectPoint(x, y) {
  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
}

function getLines(d) {
  var lines = d.properties.LINES.split('-');
  var colors = d.properties.COLORS.split('-');
  var textLines = '';
  var i;
  for (i = 0; i < lines.length; ++i) {
    textLines += '<span style="margin-right:10px; font-weight:bold; font-size:120%; color:' + colors[i] + ';">' + lines[i] + '</span>';
  }
  return textLines;
}

