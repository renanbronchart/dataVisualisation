const tab = [{value: 15, name: 'A'}, {value: 30, name: 'B'}, {value: 35, name: 'C'}, {value: 90, name: 'D'}, {value: 56, name: 'E'}, {value: 24, name: 'F'}]
const colors = ["green","red","purple","blue","brown","gray"]

const body = d3.select('body')
const svg = body.append('svg')
const pieTab = d3.layout.pie()
const arc = d3.svg.arc()

svg
  .attr({
    'width': '400px',
    'height': '400px',
    'border': '1px solid black'
  })

pieTab.value(d => {
  return d.value
})

arc.outerRadius(180)

// const grp = svg.append('g').attr('transform', 'translate(200, 200)')

const grp = svg
              .selectAll('g')
              .data(pieTab(tab))
              .enter()
              .append('g')
              .attr('transform', 'translate(200, 200)')

grp
  .append('path')
  .attr('fill', (d, i) => {
    return colors[i]
  })
  .attr('d', arc)

grp
  .append('text')
  .attr('transform', d => {
    d.innerRadius = 0
    d.outerRadius = 180

    return `translate(${arc.centroid(d)})`
  })
  .attr({
    'text-anchor': 'middle',
    'fill': 'white'
  })
  .text(d => {
    return d.data.name
  })

