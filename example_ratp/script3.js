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
      maxZoom: 16,
      minZoom: 10,
      id: 'mapbox.streets',
      accessToken: 'sk.eyJ1IjoicmVuYW5icm9uY2hhcnQiLCJhIjoiY2o5OW84enp2MHoyOTMzbndla3cyN3hrcCJ9.DdB659aMvccAu0B6ag8aJA'
  }).addTo(map);


  //HeatMap
  let geoData = [];
  const maxValue = d3.max(metropoles, function(d) { return +d.fields.population; })

  console.log(maxValue);

  (metropoles).forEach(function (d) {
    geoData.push([d.fields.geo_point_2d[0], d.fields.geo_point_2d[1], ((d.fields.population*500)/maxValue)]);
  })
  var heat = L.heatLayer(geoData,{
      radius: 10,
      blur: 20,
      maxZoom: 10,
      minZoom: 20,
      max: 2,
      minOpacity: 0.1
  }).addTo(map);
}
