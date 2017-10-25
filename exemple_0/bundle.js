(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
