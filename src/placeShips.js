import { human, UI } from './index'

export function placeShips () {
  const ships = human.fleet.getShips()
  let index = 0
  console.log(ships[index])
  let directionX = true
  const lastShowShip = [];     
  UI.setMessage("Left click places ships. Spacebar rotates ship.")
  document.addEventListener('keydown', (evt) => rotate(evt)) 
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      
      UI.player.fields[x][y].addEventListener('mouseenter', evt => showShip(Array.from(evt.target.classList)))
      UI.player.fields[x][y].addEventListener('mouseleave', evt => deShowShip(Array.from(evt.target.classList)))
    }
  }
  document.addEventListener('click', (evt) => placeShip(Array.from(evt.target.classList)))
  function placeShip (list) {
    if (ships[index] === undefined) return
    const fields = getFields(list)
    if (fields.length === ships[index].length) {    
      const result = human.board.putShip(fields, index)
      if (result === true) {
        fields.forEach(([a, b]) => {
        UI.player.fields[a][b].classList.replace('empty', 'ship')
       })
        human.fleet.setFields(index, fields)
        index++
      }
    }
    if (index >= ships.length) {
      endPlacing()
    }
  }
  function rotate(evt) {
    if (evt.code === "Space") {
      deShowShip(lastShowShip[0])
      directionX = !directionX 
      showShip(lastShowShip[0])
    }
  }
  function showShip (list) {
    if (ships[index] === undefined) return
    lastShowShip.pop()
    lastShowShip.push(list)
    getFields(list).forEach(([x, y]) => UI.player.fields[x][y].classList.add('show'))           
  }
  function deShowShip (list) {
    if (ships[index] === undefined) return
    getFields(list).forEach(([x, y]) => UI.player.fields[x][y].classList.remove('show'))           
  }
  function endPlacing () {
    document.removeEventListener('keydown', (evt) => rotate(evt))
    document.removeEventListener('click', (evt) => placeShip(Array.from(evt.target.classList)))
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        UI.player.fields[x][y].removeEventListener('mouseenter', evt => showShip(Array.from(evt.target.classList)))
        UI.player.fields[x][y].removeEventListener('mouseleave', evt => deShowShip(Array.from(evt.target.classList)))
      }
    }
    UI.startGame()
  }
  function getFields(list) {// Takes in the classlist of the field returns an array with fields which ship occupies
    const fields = []
    for (const item of list) {
      if (item.slice(0, 2) === 'xy') {
        const x = parseInt(item.charAt(2))
        const y = parseInt(item.charAt(3))
        fields.push([x, y])
        for (let i = 1; i < ships[index].length; i++) {
          if (directionX === true && (x + i) < 10) fields.push([(x + i), y])
          if (directionX === false && (y + i) < 10 ) fields.push([x, (y + i)])
        }
      }
    }
  return fields
  }
}

