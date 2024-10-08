import { human, computer, game, UI } from './index.js'

function createFleet (name) {
  const shipTypes = [
    { name: 'Carrier', length: 5, number: 1, numberSunk: 0 },
    { name: 'Battleship', length: 4, number: 2, numberSunk: 0 },
    { name: 'Cruiser', length: 3, number: 3, numberSunk: 0 }
    // { name: 'Submarine', length: 3, number: 4, numberSunk: 0 },
    // { name: 'Destroyer', length: 2, number: 5, numberSunk: 0 }
  ]
  const ships = []
  for (const type of shipTypes) {
    for (let i = 0; i < type.number; i++) {
      ships.push({ name: type.name, length: type.length, hits: 0, sunk: false, fields: [] })
    }
  }
  function hit (index) {
    ships[index].hits += 1
    if (ships[index].hits === ships[index].length) {
      ships[index].sunk = true
      UI.setMessage(`A ${ships[index].name} from ${name} sunk!`)
      shipTypes.forEach(type => {
        if (type.name === ships[index].name) type.numberSunk++
      })
      UI.displaySunk(ships[index].fields, name)
      checkGameEnd()
    }
  }
  function checkGameEnd () {
    let allSunk = true
    for (const ship of ships) {
      if (ship.sunk === false) allSunk = false
    }
    if (allSunk === true) game.end(name)
  }
  function placeFleet () {
    ships.forEach((ship, index) => {
      let result = false
      while (result === false) {
        const x = Math.floor(Math.random() * 10)
        const y = Math.floor(Math.random() * 10)
        const dir = Math.floor(Math.random() * 4)
        const fields = []
        fields.push([x, y])
        for (let i = 1; i < ship.length; i++) {
          if (dir === 0) fields.push([x + i, y])
          if (dir === 1) fields.push([x - i, y])
          if (dir === 2) fields.push([x, y + i])
          if (dir === 3) fields.push([x, y - i])
        }
        if (name === 'human') result = human.board.putShip(fields, index)
        if (name === 'computer') result = computer.board.putShip(fields, index)
        if (result === true) {
          ships[index].fields = fields
        }
      }
    })
  }
  function getFleet () {
    return shipTypes
  }
  function getShips () {
    return ships
  }
  function setFields (index, fields) {
    ships[index].fields = fields
  }
  return { hit, placeFleet, checkGameEnd, getFleet, getShips, setFields }
}

export { createFleet }
