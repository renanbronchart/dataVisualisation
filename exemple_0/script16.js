(function () {
  const body = d3.select('body')
  const svg = body.append('svg')
  const title = d3.select('.title__department')

  title.style('opacity', '0')

  svg.attrs({
    width: 600,
    height: 600
  })

  const path = d3.geoPath()
  const projection = d3.geoConicConformal()
                        .center([2.454071, 46.279229])
                        .scale(3000)
                        .translate([300, 300])

  path.projection(projection)

  d3.json('departements.json', (geoJSON) => {
    const map = svg.selectAll('path')
                    .data(geoJSON.features)

    map.enter()
        .append('path')
        .attr('fill', 'black')
        .attr('stroke', 'white')
        .attr('d', path)
        .on('mouseover', function (d) {
          d3.select(this)
            .attr('fill', 'red')

          title.transition()
                .duration(300)
                .style("opacity", .9)

          title.text(`Département: ${d.properties.NOM_DEPT}`)
        })
        .on('mouseout', function () {
          d3.select(this)
            .attr('fill', 'black')

          title.transition()
                .duration(500)
                .style("opacity", 0)
          title.text('')
        })
  })


})()
