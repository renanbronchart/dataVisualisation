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

const grp = svg.selectAll('g')
                .data(pieTab(tab))
                .enter()
                .append('g')
                .attr('transform', 'translate(500, 500)')

grp.append('path')
    .attr('fill', (d, index) => {
      return colors[index]
    })
    .attr('d', arc)
    .attr('transform', 'scale(2)')

grp.append('text')
    .attr('transform', d => {
      d.innerRadius = 180
      d.outerRadius = 360

      return `translate(${arc.centroid(d)})`
    })
    .attr({
      'fill': 'white',
      'text-anchor': 'middle',
      'font-size': '10'
    })
    .text((d) => {
      return d.data.nom
    })
