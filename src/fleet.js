import { human, computer, game, UI } from './index.js'

function createFleet (name) {
  const ships = [
    { name: 'Carrier', length: 5 },
    { name: 'Battleship', length: 4 },
    { name: 'Battleship', length: 4 },
    { name: 'Cruiser', length: 3 },
    { name: 'Cruiser', length: 3 },
    { name: 'Cruiser', length: 3 },
    { name: 'Submarine', length: 3 },
    { name: 'Submarine', length: 3 },
    { name: 'Submarine', length: 3 },
    { name: 'Submarine', length: 3 },
    { name: 'Destroyer', length: 2 },
    { name: 'Destroyer', length: 2 },
    { name: 'Destroyer', length: 2 },
    { name: 'Destroyer', length: 2 },
    { name: 'Destroyer', length: 2 }
  ]
  for (const ship of ships) {
    ship.hits = 0
    ship.sunk = false
    ship.fields = []
  }
  function hit (index) {
    ships[index].hits += 1
    if (ships[index].hits === ships[index].length) {
      ships[index].sunk = true
      UI.setMessage(`A ${ships[index].name} from ${name} sunk!`)
      UI.displaySunk(ships[index].fields, name)
      fleetStatus()
    }
  }
  function fleetStatus () {
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
  return { hit, placeFleet, fleetStatus }
}

export { createFleet }
