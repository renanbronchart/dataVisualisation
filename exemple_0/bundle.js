(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
  var body = d3.select('body');
  d3.csv('donnees.csv', (data) => {
    const scaleX = d3.scale
                     .ordinal()
                     .domain(data.map((d, i) => {return d.jour}))
                     .rangeBands([30, 370])

    const scaleY = d3.scale
                     .linear()
                     .domain([0, 54])
                     .range([370, 30])

    const xAxe = d3.svg.axis()
                       .scale(scaleX)
                       .orient('bottom')

    const yAxe = d3.svg.axis()
                       .scale(scaleY)
                       .orient('left')

    const svg = body.append('svg')
    const titre = svg.append('text').attr({'x': '50', 'y': '20'})

    svg.attr({'width': '400px', 'height': '400px'})

    svg.append('g')
      .style({
        'font-size': '9px',
        'font-family': 'sans-serif'
      })
      .attr({
        'fill': 'none',
        'stroke': 'black',
        'transform': 'translate(0, 370)'
      })
      .call(xAxe)

    svg.append('g')
      .style({
        'font-size': '11px',
        'font-family': 'sans-serif'
      })
      .attr({
        'fill': 'none',
        'stroke': 'black',
        'transform': 'translate(30, 0)'
      })
      .call(yAxe)

      const params = svg.selectAll('rect')
                        .data(data)

      titre.text(`donnees CSV`)


       params.enter()
              .append('rect')
              .attr('stroke', 'black')
              .attr('width', (d, i) => {
                return (340/data.length)
              })
              .attr('height', (d, i) => {
                return (370 - scaleY(d.nbre_visiteurs))
              })
              .attr('fill', 'blue')
              .attr('x', (d, i) => {
                return (30+i*340/data.length)
              })
              .attr('y', (d, i) => {
                return (scaleY(d.nbre_visiteurs))
              })

  })
})()

},{}]},{},[1]);
