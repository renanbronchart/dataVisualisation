(function () {
  const tab = [30, 40, 50, 60]

  const body = d3.select('body')
  let paras = body.selectAll('p')
                  .data(tab)
                  .enter()
                  .append('p')
                  .text((d, i) => {
                    return `Le texte ${i} contient la valeur ${d}`
                  })
  paras
    .on('mouseover', function () {
      d3.select(this).style('color', 'red')
    })
    .on('mouseout', function () {
      d3.select(this).style('color', 'black')
    })

})()
