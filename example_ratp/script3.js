queue()
  .defer(d3.json, "densite.json") // get stations.json
  .await(drawCharts); // after get lines and stations call ready function

var map = L.map('map', {
  center: [48.853, 2.333],
  zoom: 14
});

function drawCharts (error, metropoles) {
  var ndx = crossfilter(metropoles);

  var numberRecordsND = dc.numberDisplay("#number-records-nd");
  var populationBrandChart = dc.rowChart("#population-chart");
  var departementChart = dc.rowChart("#departement-row-chart");

  var populationDim = ndx.dimension(function(d) { return d.fields.population; });
  var departementDim = ndx.dimension(function(d) { return d.fields.nom_dept; });
  var allDim = ndx.dimension(function(d) {return d.fields;});

  var populationGroup = populationDim.group();
  var departementGroup = departementDim.group();
  var all = ndx.groupAll();

  numberRecordsND
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d) {return d; })
    .group(all);

  departementChart
    .width(200)
    .height(510)
    .dimension(departementDim)
    .group(departementGroup)
    .ordering(function(d) { return -d.value })
    .colors(['#6baed6'])
    .elasticX(true)
    .labelOffsetY(10)
    .xAxis()
    .ticks(4);

  populationBrandChart
    .width(300)
    .height(150)
    .dimension(populationDim)
    .group(populationGroup)
    .colors(['#6baed6'])
    .elasticX(true)
    .labelOffsetY(10)
    .xAxis()
    .ticks(4);


  function drawMap (metropoles) {
    function initLocation () {
      map.on('locationfound', onLocationFound);

      map.on('locationerror', onLocationError);

      map.locate({setView: true, maxZoom: 14});
    }

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
        alert(e.message);
    }

    // initLocation();

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
      geoData.push([d.fields.geo_point_2d[0], d.fields.geo_point_2d[1], ((d.fields.population)/114.2)]);
    })
    var heat = L.heatLayer(geoData, {
        radius: 10,
        blur: 15,
        maxZoom: 10,
        minZoom: 20,
        // max: 2,
        minOpacity: 0.5
    }).addTo(map);
  }

  drawMap(metropoles);


  var dcCharts = [departementChart, populationBrandChart];

  dcCharts.forEach(function (dcChart) {
    dcChart.on("filtered", function (chart, filter) {
      console.log(chart, 'chart')
      console.log(filter, 'filter')
        map.eachLayer(function (layer) {
          map.removeLayer(layer)
        });
    drawMap(metropoles);
    });
  })


  dc.renderAll();
}
