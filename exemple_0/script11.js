var tab_0=[30,150,27,34];
var tab_1=[25,120,40,75];
var tab_2=[40,110,80,76];
var tab=[tab_0,tab_1,tab_2]
var n=0;
var couleurs=["blue","red","purple","olive"];
var body=d3.select("body");
var svg=body.append("svg");
svg.attr({"width":"400px","height":"400px"})
svg.style("border","1px solid black");

var pieTab=d3.layout.pie();
pieTab.value(function(d){
        return d;
    });

var arc=d3.svg.arc();
arc.outerRadius(180);

var grp=svg.append("g").attr("transform","translate(200,200)");
var graph=grp.selectAll("path").data(pieTab(tab_0))
graph.enter()
  .append("path")
  .attr("fill",function(d,i){
      return(couleurs[i]);
    })
  .attr("d",arc)
  .each(function(d){this._current=d;});

function update(data){
    graph.data(pieTab(data));
    graph.transition().duration(750).attrTween("d", arcTween);

}

function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}
setInterval(function() {
  if (n==2){
    n=-1;
  }
  n=n+1;
  update(tab[n]);
}, 3000);

