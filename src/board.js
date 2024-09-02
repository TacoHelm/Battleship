import { human, computer } from './index.js'

function createBoard (name) {
  const fields = [];                                 
  for (let x = 0; x < 10; x++) {
    fields.push([]);
    for (let y = 0; y < 10; y++) {
      fields[x].push({ empty: true, hit: false })
    }
  }
  const attack = function ([x, y]) {
    if (fields[x][y].hit === true) return false
    fields[x][y].hit = true
    if (fields[x][y].empty === true) {
      console.log('Shot misses')
      return true
    }
    if (fields[x][y].empty === false) {
      console.log('Hit!')
      if (name === 'human') computer.fleet.hit(fields[x][y].fleetArrayIndex)
      if (name === 'computer') human.fleet.hit(fields[x][y].fleetArrayIndex)
    }
    return true
  }
  const putShip = function (arr, fleetArrayIndex) {
    let fieldsAllValid = true
    arr.forEach(([x, y]) => {
      if (x > 9 || x < 0 || y > 9 || y < 0) {
        fieldsAllValid = false
        return
      }
      if (fields[x][y].empty === false) fieldsAllValid = false
    })
    if (fieldsAllValid === false) return false
    arr.forEach(([x, y]) => {
      fields[x][y].empty = false
      fields[x][y].fleetArrayIndex = fleetArrayIndex
    })
    return true
  }
  return { attack, putShip }
}

export { createBoard }
