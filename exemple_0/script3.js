// const tab = [30, 150, 27, 85, 3, 12]

// const body = d3.select('body')

// body.selectAll('p')
//   .data(tab)
//   .enter()
//   .append('p')
//   .text((d, i) => {return `index ${i} = ${d}`})



// Diagramme

// const tab = [10,8,25,15,4,30,12,27,2]

// const body = d3.select('body')
// const svg = body.append('svg')

// svg.attr({"width": "800px", "height": "600px"})
// svg.style("border", "1px solid black")

// svg.selectAll('rect')
//   .data(tab)
//   .enter()
//   .append('rect')
//   .attr({"width": "30px", "stroke": "black"})
//   .attr("height", (d, i) => {
//     return (d*10)
//   })
//   .attr("fill", (d, i) => {
//     return d < 15 ? 'red' : 'blue'
//   })
//   .attr("y", (d, i) => {
//     return (500-(d*10))
//   })
//   .attr("x", (d, i) => {
//     return (200+i*34)
//   })



// nuages de points

const body = d3.select('body')

const tab = [[5,3],[15,4],[3,10],[8,5],[20,8]]
const scaleX = d3.scale.linear()
                       .domain([0, 20])
                       .range([30, 370])
const scaleY = d3.scale.linear()
                       .domain([0, 10])
                       .range([370, 30])
const xAxe = d3.svg.axis()
                   .scale(scaleX)
                   .orient('bottom')

const yAxe = d3.svg.axis()
                   .scale(scaleY)
                   .orient('left')

const svg = body.append('svg')

svg.attr({"width": "400px", "height": "400px"})
svg.style("border", "1px solid black")

svg.selectAll('circle')
  .data(tab)
  .enter()
  .append('circle')
  .attr({'r': '3px', 'fill': 'black', 'stroke': 'black'})
  .attr('cx', (d, i) => {
    return (scaleX(d[0]))
  })
  .attr('cy', (d, i) => {
    return (370 - scaleY(d[1]))
  })

svg.append('g')
  .style({'font-family': 'sans-serif', 'font-size': '11px'})
  .attr({'fill': 'none' , 'stroke': 'black', 'transform': 'translate(0, 370)'})
  .call(xAxe)

svg.append('g')
  .style({'font-family': 'sans-serif', 'font-size': '11px'})
  .attr({'fill': 'none' , 'stroke': 'black', 'transform': 'translate(30, 0)'})
  .call(yAxe)








