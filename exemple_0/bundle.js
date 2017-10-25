(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
  let body = d3.select('body')
  let dateFormat = d3.time.format('%d/%m/%Y')

  let scaleX = d3.time.scale().range([50, 870])
  let scaleY = d3.scale.linear().range([570, 50])

  let xAxe = d3.svg
                .axis()
                .scale(scaleX)
                .orient('bottom')
  let yAxe = d3.svg
                .axis()
                .scale(scaleY)
                .orient('left')

  let line = d3.svg
                .line()
                .x((d) => {
                  return scaleX(d.date)
                })
                .y((d) => {
                  return scaleY(d.close)
                })

  let svg = body.append('svg')

  svg.attr({
    'width': '900px',
    'height': '600px'
  })

  d3.tsv('data.tsv', (data) => {
    data.forEach((d) => {
      d.date = dateFormat.parse(d.date)

      d.close = +d.close
    })

    scaleX.domain(d3.extent(data, (d) => {
      return d.date
    }))

    scaleY.domain(d3.extent(data, (d) => {
      return d.close
    }))

    svg.append('g')
        .style({
          'font-size': '11px',
          'font-family': 'sans-serif'
        })
        .attr({
          'fill': 'none',
          'stroke': 'black',
          'transform': 'translate(0, 570)'
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
          'transform': 'translate(50, 0)'
        })
        .call(yAxe)

    svg.append('path')
        .datum(data)
        .attr({
          'fill': 'none',
          'stroke': 'black'
        })
        .attr('d', line)

  })
})()

},{}]},{},[1]);
