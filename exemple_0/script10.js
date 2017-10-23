
const tab = [{"valeur": 18287000, "nom":"États-Unis"},{"valeur": 11285000, "nom":"Chine"},{"valeur": 4882000, "nom":"Japon"},{"valeur": 3909000, "nom":"Allemagne"},{"valeur": 3003000, "nom":"Royaume-Uni"},{"valeur":2935000, "nom":"France"}];
const colors = ["green", "red", "brown", "blue", "purple", "olive"];

const body = d3.select('body');
const svg = body.append('svg');
const pieTab = d3.layout.pie();
const arc = d3.svg.arc();

svg.attr({
  "width": "1000px",
  "height": "1000px",
  "border": "1px solid black"
});

pieTab.value(d => {
  return d.valeur
})

arc.outerRadius(180)

const arcs = svg.selectAll('g.arcs')
                .data(pieTab(tab))
                .enter()
                .append('g')
                .attr('transform', 'translate(180, 300)')

arcs.append('path')
    .attr('fill', (d, index) => {
      return colors[index]
    })
    .attr('class', 'arcs')
    .attr('d', arc)


const leg = svg.selectAll('g.legendes')
                .data(pieTab(tab))
                .enter()
                .append('g')
                .attr('class', 'legendes')
                .attr('transform', (d, i) => {
                  return `translate(400, ${100+30*i})`
                })

leg.append('rect')
  .attr({
    'width': '20px',
    'height': '20px'
  })
  .attr('fill', (d, i) => {
    return colors[i]
  })

leg.append('text')
  .attr({
    'fill': 'black'
  })
  .attr("x", 25)
  .attr('y', 12)
  .style({
    'font-size': '14px',
  })
  .text((d) => {
    return d.data.nom
  })

svg.append('text')
  .attr({
    'fill': 'black',
    'x': '200',
    'y': '30',
    'text-anchor': 'middle'
  })
  .style('font-size', '20px')
  .text('PIB en 2018')

// leg.append("rect")
//   .attr("width",15)
//   .attr("height",15)
//   .attr("fill",function (d,i){
//     return colors[i];
//   });
// leg.append("text")
//   .attr("x", 25)
//   .attr('y', 12)
//   .attr("fill","black")
//   .style("font-size","12px")
//     .text(function(d,i) {
//         return d.data.nom;
//     });



// grp.append('text')
//     .attr('transform', d => {
//       d.innerRadius = 180
//       d.outerRadius = 360

//       return `translate(${arc.centroid(d)})`
//     })
//     .attr({
//       'fill': 'white',
//       'text-anchor': 'middle',
//       'font-size': '10'
//     })
//     .text((d) => {
//       return d.data.nom
//     })

