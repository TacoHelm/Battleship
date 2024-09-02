import { createBoard } from './board'
import { createFleet } from './fleet'

function createPlayer (name) {
  const board = createBoard(name)
  const fleet = createFleet(name)
  return { board, fleet }
}

export { createPlayer }
