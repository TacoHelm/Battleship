import { createPlayer } from './player'
import { createGame } from './game'

const human = createPlayer('human')
const computer = createPlayer('computer')
const game = createGame()

human.fleet.placeFleet()
computer.fleet.placeFleet()

game.loop()

export { human, computer, game}


