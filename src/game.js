import { human, computer, UI } from './index'

function createGame () {
  const computerTurn = function () {
    let result = false
    while (result === false) {
      const x = Math.floor(Math.random() * 10)
      const y = Math.floor(Math.random() * 10)
      result = human.board.attack([x, y])
    }
  }
  const humanTurn = function (evt) {
    for (const item of evt.target.classList) {
      if (item.slice(0, 2) === 'xy') {
        const x = item.charAt(2)
        const y = item.charAt(3)
        const result = computer.board.attack([x, y])
        if (result === true) computerTurn()
      }
    }
  }
  const end = function (name) {
    if (name === 'human') UI.setMessage('Player has lost his fleet. Computer has won')
    if (name === 'computer') UI.setMessage('Computer has lost his fleet. You have won')
  }
  return { humanTurn, end }
}

export { createGame }
