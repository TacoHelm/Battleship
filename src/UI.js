import { human, computer, game } from './index'

function createUI () {
  const messageQueue = [] // Queue for messages to display by function setMessage
  const player = {}  // Objects for DOM-elements for human and computer
  const AI = {}
  player.fields = [] 
  AI.fields = []
  player.ships = []
  AI.ships = []
  const body = document.querySelector('body')
  const container = newDiv(body, ['container'])
  const title = newDiv(container, ['title'])
  title.textContent = 'Zeeslag'
  const messageBox = newDiv(container, ['message-box'])
  player.container = newDiv(container, ['player-container', 'human'])
  AI.container = newDiv(container, ['player-container', 'computer'])
  newDivBoth('title', 'container', ['player-title'])
  newDivBoth('fleet', 'container', ['fleet'])
  newDivBoth('board', 'container', ['board'])
  player.title.textContent = 'You'
  AI.title.textContent = 'Computer'
  for (let x = 0; x < 10; x++) {  // Divs for board
    player.fields[x] = []
    AI.fields[x] = []
    for (let y = 0; y < 10; y++) {
      player.fields[x].push(newDiv(player.board, ['field', 'human', 'not-hit', `xy${x}${y}`]))
      AI.fields[x].push(newDiv(AI.board, ['field', 'computer', 'not-hit', `xy${x}${y}`]))
      AI.fields[x][y].addEventListener('click', (evt) => game.humanTurn(evt))
      human.board.getField(x, y).empty === true ? player.fields[x][y].classList.add('empty') : player.fields[x][y].classList.add('ship')
      computer.board.getField(x, y).empty === true ? AI.fields[x][y].classList.add('empty') : AI.fields[x][y].classList.add('ship')
    }
  }
  const shipTypes = human.fleet.getFleet()
  shipTypes.forEach((item, index)=> {  // Divs for fleet display
    player.ships[index] = {}
    AI.ships[index] = {}
    player.ships[index].container = newDiv(player.fleet, ['ship-container'])
    AI.ships[index].container = newDiv(AI.fleet, ['ship-container'])
    player.ships[index].title = newDiv(player.ships[index].container, ['ship-text'])
    AI.ships[index].title = newDiv(AI.ships[index].container, ['ship-text'])
    player.ships[index].title.textContent = item.name
    AI.ships[index].title.textContent = item.name
    player.ships[index].symbol = newDiv(player.ships[index].container, ['ship-symbol'])
    AI.ships[index].symbol = newDiv(AI.ships[index].container, ['ship-symbol'])
    player.ships[index].symbol.textContent = shipString(item.length)
    AI.ships[index].symbol.textContent = shipString(item.length)
    player.ships[index].bar = newDiv(player.ships[index].container, ['progress-bar', item.name])
    AI.ships[index].bar = newDiv(AI.ships[index].container, ['progress-bar', item.name])
    player.ships[index].bar.style.setProperty('--width', 3)
    AI.ships[index].bar.style.setProperty('--width', 3)
  })
  function setHit (name, x, y) {
    if (name === 'human') player.fields[x][y].classList.replace('not-hit', 'hit')
    if (name === 'computer') AI.fields[x][y].classList.replace('not-hit', 'hit')
  }
  function setMessage (string) {
    messageQueue.push(string)
    if (!messageBox.classList.contains('new')) { // Tests indirectly if there is an active timeout
      messageBox.textContent = messageQueue.shift()
      messageBox.classList.add('new')
      setTimeout(setMessageCallback, 1500)
    }
  }
  function setMessageCallback () { // Callback for timeout in function setMessage
    messageBox.classList.remove('new')
    if (messageQueue.length > 0) {
      messageBox.textContent = messageQueue.shift()
      messageBox.classList.add('new')
      setTimeout(setMessageCallback, 1500)
    }
  }
  function displaySunk (fields, name) {
    fields.forEach(([x, y]) => {
      if (name === 'human') player.fields[x][y].classList.replace('hit', 'sunk')    
      if (name === 'computer') AI.fields[x][y].classList.replace('hit', 'sunk')
    })
    if (name === 'human') {    
      human.fleet.getFleet().forEach(element => {
        for (let i = 0; i < player.ships.length; i++) {
          if (player.ships[i].bar.classList.contains(element.name)) player.ships[i].bar.style.setProperty('--width', ((element.numberSunk / element.number) * 100))
        }
      })
    }
    if (name === 'computer') {
      computer.fleet.getFleet().forEach(element => {
        for (let i = 0; i < AI.ships.length; i++) {
          if (AI.ships[i].bar.classList.contains(element.name)) AI.ships[i].bar.style.setProperty('--width', ((element.numberSunk / element.number) * 100))
        }
      })
    }
  }
  function shipString (length) {
    let text = '\u25C0'
    for (let i = 2; i < length; i++) {
      text += '\u25A0'
    }
    text += '\u25B6'
    return text
  }
  function newDiv (parent, classes) {
    const div = parent.appendChild(document.createElement('div'))
    classes.forEach((element) => div.classList.add(element))
    return div
  }
  function newDivBoth (divName, parent, classes) {
    player[divName] = newDiv(player[parent], classes)
    AI[divName] = newDiv(AI[parent], classes)
  }
  function endGame () {
    for (let x = 0; x < 10; x++){
      for (let y = 0; y < 10; y++){
      AI.fields[x][y].removeEventListener('click', (evt) => game.humanTurn(evt))
      }
    }
  messageBox.classList.replace('new', 'won')  
  }
  return { setHit, setMessage, displaySunk, endGame }
}

export { createUI }
