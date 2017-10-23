// const tab = [30,150,27,85,3,12]
// const body = d3.select('body')

// body.append('p').text('je ne suis pascomme les autres')

// body.selectAll('p')
//   .data(tab)
//   .enter()
//   .append('p')
//   .text((d, i) => {
//     return `la balise ${i} contient ${d}`
//   })



const tab_0 = [30,150,27,85,3,12]
const tab_1 = [25,120,40,75,15,23]
const tab_2 = [40,110,80,76,26]
const tab = [tab_0, tab_1, tab_2]

let n = 0

const body = d3.select('body')

const update = function update (tab) {
  const params = body.selectAll('p').data(tab)

  params
    .text((d, i) => {
      return `la valeur de l'index ${i} est égale à ${d}`
    })
  params
    .enter()
    .append('p')
    .text((d, i) => {
      return `la valeur de l'index ${i} est égale à ${d}`
    })

  params.exit().remove()
}

update(tab[0])

setInterval(() => {
  if (n == (tab.length) - 1) {
    n = -1
  }

  n += 1
  update(tab[n])
}, 1000)
