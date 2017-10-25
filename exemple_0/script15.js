(function () {
  const tab = [30, 40, 20, 70, 10, 5, 30, 60]

  const body = d3.select('body')
  let paras = body.selectAll('p')
                  .data(tab)
                  .enter()
                  .append('p')
                  .text((d, i) => {
                    return `Le rond n°${i} a pour rayon ${d}px`
                  })
  let svg = body.append('svg')
                .attr({
                  'width': '800px',
                  'height': '800px',
                  'border': '1px solid black'
                })
  let circles = svg.selectAll('circle')
                    .data(tab)
                    .enter()
                    .append('circle')
                    .attr({
                      'fill': 'black',
                    })
                    .attr('cx', (d, i) => {
                      return 30+d+i*70
                    })
                    .attr('cy', '200')
                    .attr('r', (d, i) => {
                      return `${d/3}px`
                    })
                    .on('mouseover', function () {
                      d3.select(this).attr('fill', 'red')
                    })
                    .on('mouseout', function () {
                      d3.select(this).attr('fill', 'black')
                    })


  paras
    .on('mouseover', function () {
      d3.select(this).style('color', 'red')
    })
    .on('mouseout', function () {
      d3.select(this).style('color', 'black')
    })

})()
