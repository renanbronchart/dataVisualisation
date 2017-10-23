let body = d3.select('body')
let a = body.append('a')

body.append('h1')
  .style('color', '#EFEFEF')
  .text('Hugo le salaud')

a.attr({'href': 'https://d3js.org/', 'target': '_blank'})
  .append('img')
  .attr('src', './d3js-logo.jpg')



const svg = body.append('svg')

svg.attr({'width':'800px','height':'600px'});
svg.style('border','1px solid black');


svg.append("circle")
  .attr({"cx":"400px","cy":"300px","r":"50px","fill":"blue","stroke":"red"});





