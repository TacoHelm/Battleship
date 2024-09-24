import { human, UI } from './index'

export function placeShips () {
  const ships = human.fleet.getShips()
  let index = 0
  let directionX = true
  document.addEventListener('dblclick', () => directionX = !directionX)
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      UI.player.fields[x][y].addEventListener('mouseenter', evt => showShip(evt))
      UI.player.fields[x][y].addEventListener('mouseleave', evt => deShowShip(evt))
    }
  }
  document.addEventListener('click', (evt) => placeShip(evt))
  function placeShip (evt) {
    if (ships[index] === undefined) return
    for (const item of evt.target.classList) {
      if (item.slice(0, 2) === 'xy') {
        const x = parseInt(item.charAt(2))
        const y = parseInt(item.charAt(3))
        const fields = []
        fields.push([x, y])
        for (let i = 1; i < ships[index].length; i++) {
          if (directionX === true) fields.push([(x + i), y])
          if (directionX === false) fields.push([x, (y + i)])
        }
        const result = human.board.putShip(fields, index)
        if (result === true) {
          fields.forEach(([a, b]) => {
            UI.player.fields[a][b].classList.replace('empty', 'ship')
          })
          human.fleet.setFields(index, fields)
          index++
        }
        if (index >= ships.length) {
          endPlacing()
        }
      }
    }
  }
  function endPlacing () {
    document.removeEventListener('dblclick', () => directionX = !directionX)
    document.removeEventListener('click', (evt) => placeShip(evt))
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        UI.player.fields[x][y].removeEventListener('mouseenter', evt => showShip(evt))
        UI.player.fields[x][y].removeEventListener('mouseleave', evt => deShowShip(evt))
      }
    }
    UI.startGame()
  }
  function showShip (evt) {
    if (ships[index] === undefined) return
    for (const item of evt.target.classList) {
      if (item.slice(0, 2) === 'xy') {
        const x = parseInt(item.charAt(2))
        const y = parseInt(item.charAt(3))
        const fields = []
        fields.push([x, y])
        for (let i = 1; i < ships[index].length; i++) {
          if (directionX === true) fields.push([(x + i), y])
          if (directionX === false) fields.push([x, (y + i)])
        }
        fields.forEach(([a, b]) => {
          if (a < 10 && b < 10) {
            UI.player.fields[a][b].classList.add('show')
          }
        })
      }
    }
  }
  function deShowShip (evt) {
    if (ships[index] === undefined) return
    for (const item of evt.target.classList) {
      if (item.slice(0, 2) === 'xy') {
        const x = parseInt(item.charAt(2))
        const y = parseInt(item.charAt(3))
        const fields = []
        fields.push([x, y])
        for (let i = 1; i < ships[index].length; i++) {
          if (directionX === true) fields.push([(x + i), y])
          if (directionX === false) fields.push([x, (y + i)])
        }
        fields.forEach(([a, b]) => {
          if (a < 10 && b < 10) {
            UI.player.fields[a][b].classList.remove('show')
          }
        })
      }
    }
  }
}
