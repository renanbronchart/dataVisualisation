(function () {
  const body = d3.select('body')
  const svg = body.append('svg')

  svg.attr({
    'width': '600px',
    'height': '600px'
  })

  const path = d3.geo.path()
  const projection = d3.geo.conicConformal()
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
        .on('mouseover', function () {
          d3.select(this).attr('fill', 'red')
          setTimeout(() => {
            d3.select(this).attr('fill', 'black')
          }, 150)
        })
        .on('click', function () {
          d3.select(this).attr('fill', 'red')
        })
  })


})()
