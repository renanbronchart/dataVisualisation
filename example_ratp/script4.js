queue()
    .defer(d3.json, "densite.json")
    .await(makeGraphs);

var map = L.map('map', {
  center: [48.853, 2.333],
  zoom: 14
});

function makeGraphs(error, recordsJson) {
  //Clean data
  var records = recordsJson;

  //Create a Crossfilter instance
  var ndx = crossfilter(records);

  //Define Dimensions
  var populationDim = ndx.dimension(function(d) { return d.fields.population; });
  var departementDim = ndx.dimension(function(d) { return d.fields.nom_dept; });
  var allDim = ndx.dimension(function(d) {return d.fields;});

  //Group Data
  var populationGroup = populationDim.group();
  var departementGroup = departementDim.group();
  var all = ndx.groupAll();

  //Charts
  var numberRecordsND = dc.numberDisplay("#number-records-nd");
  var populationBrandChart = dc.rowChart("#population-chart");
  var departementChart = dc.rowChart("#departement-row-chart");

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

  //Draw Map
  drawMap(allDim);

  //Update the heatmap if any dc chart get filtered
  dcCharts = [departementChart, populationBrandChart];

  dcCharts.forEach(function (dcChart) {
    dcChart.on("filtered", function (chart, filter) {

      var transitionPoints = new Promise(
        // La fonction de résolution est appelée avec la capacité de
        // tenir ou de rompre la promesse
        function(resolve, reject) {
          d3.select('.leaflet-objects-pane')
            .transition()
            .duration(700)
            .style("opacity", "0")
            .transition()
            .duration(500)
            .style("opacity","1")


          setTimeout(function () {
            resolve('la promesse marche');
          }, 550);
        }
      );

      transitionPoints.then(
         // On affiche un message avec la valeur
        function (val) {
          console.log(val);

          map.eachLayer(function (layer) {
            map.removeLayer(layer)
          });

           drawMap(allDim);
        }).catch(
           // Promesse rejetée
          function() {
            console.log("promesse rompue");
          });
    });
  })

  dc.renderAll();
};


var drawMap = function (allDim) {
  // map.setView([31.75, 110], 4);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 16,
      minZoom: 10,
      id: 'mapbox.streets',
      accessToken: 'sk.eyJ1IjoicmVuYW5icm9uY2hhcnQiLCJhIjoiY2o5OW84enp2MHoyOTMzbndla3cyN3hrcCJ9.DdB659aMvccAu0B6ag8aJA'
  }).addTo(map);

  var allDimTop = allDim.top(Infinity);

  const maxValue = d3.max(allDimTop, function(d) { return +d.fields.population })

  //HeatMap
  var geoData = [];

  // a voir
  allDimTop.forEach(function (d) {
    // console.log(d)
    geoData.push([d.fields.geo_point_2d[0], d.fields.geo_point_2d[1], ((d.fields.population)/maxValue)]);
  })

  var heat = L.heatLayer(geoData,{
      radius: 10,
      blur: 15,
      maxZoom: 10,
      minZoom: 20,
      // max: 2,
      minOpacity: 0.5
  }).addTo(map);

};

