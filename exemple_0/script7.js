const tab = [15,30,35,90, 56, 24]
const couleurs = ["green","yellow","purple","blue","brown","gray"]

const body = d3.select('body')
const svg = body.append('svg')
const pieTab = d3.layout.pie()
const arc = d3.svg.arc()
const arc2 = d3.svg.arc()

svg
  .attr({
    'width': '400px',
    'height': '400px'
  })
  .style({
    'border': '1px solid black'
  })

pieTab.value((d) => {
  return d
})

arc.outerRadius(180) // je défini l'angle externe du cercle.
arc2.innerRadius(80) // je défini l'angle interne du cercle.

const grp = svg.append('g').attr('transform', 'translate(200, 200)')
const graph = grp.selectAll('path').data(pieTab(tab))

graph
  .enter()
  .append('path')
  .attr('fill', (d, i) => {
    return couleurs[i]
  })
  .attr('d', arc)

graph
  .enter()
  .append('path')
  .attr('fill', 'white')
  .attr('d', arc2)



