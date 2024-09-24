import { createPlayer } from './player'
import { createGame } from './game'
import { createUI } from './UI'
import { placeShips } from './placeShips'
import './style.css'

const human = createPlayer('human')
const computer = createPlayer('computer')
const game = createGame()
computer.fleet.placeFleet()
const UI = createUI()
placeShips()

export { human, computer, game, UI }
