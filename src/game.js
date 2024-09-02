import { human, computer } from './index'

function createGame () {
  let ended = false
  const loop = function () {
    let i = 0
    while (ended === false) {
      i++
      if ((i % 2) === 1) humanTurn()
      if ((i % 2) === 0) computerTurn()
    }
  }
  const computerTurn = function () {
    let result = false
    while (result === false) {
      const x = Math.floor(Math.random() * 10)
      const y = Math.floor(Math.random() * 10)
      result = human.board.attack([x, y])
    }
  }
  const humanTurn = function () {
    let result = false
    while (result === false) {
      const x = Math.floor(Math.random() * 10)
      const y = Math.floor(Math.random() * 10)
      result = computer.board.attack([x, y])
    }
  }
  const end = function (name) {
    ended = true
    console.log(`${name} has lost his fleet`)
    if (name === 'human') console.log('computer has won')
    if (name === 'computer') console.log('you have won')
  }
  return { loop, end }
}

export { createGame }


