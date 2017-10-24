(function () {
  var body = d3.select('body');
  var nbreTotal = 0;

  d3.csv('donnees.csv', (data) => {
    var para = body.selectAll('p')
                  .data(data)
                  .enter()
                  .append('p')
                  .text((d, i) => {
                    return `Le ${d.jour} il y a ${d.nbre_visiteurs} visiteurs`
                  })
                  .each((d, i) => {
                    nbreTotal += +d.nbre_visiteurs
                  })

    body.append('p')
        .text(`Il y a au total ${nbreTotal} visiteurs par semaine`)

  })
})()
