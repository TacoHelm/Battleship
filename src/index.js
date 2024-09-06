import { createPlayer } from './player'
import { createGame } from './game'
import { createUI } from './UI'
import './style.css'

const human = createPlayer('human')
const computer = createPlayer('computer')
const game = createGame()

human.fleet.placeFleet()
computer.fleet.placeFleet()

const UI = createUI()

export { human, computer, game, UI }
