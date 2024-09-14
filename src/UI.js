import { human, computer, game } from './index'

function createUI () {
  const messageQueue = [] // Queue for messages to display by function setMessage
  const body = document.querySelector('body')
  const container = body.appendChild(document.createElement('div'))
  container.classList.add('container')
  const title = container.appendChild(document.createElement('div'))
  title.classList.add('title')
  title.textContent = 'Zeeslag'
  const messageBox = container.appendChild(document.createElement('div'))
  messageBox.classList.add('messageBox')
  const humanContainer = container.appendChild(document.createElement('div'))
  const humanTitle = humanContainer.appendChild(document.createElement('div'))
  const humanFleet = humanContainer.appendChild(document.createElement('div'))
  const humanBoard = humanContainer.appendChild(document.createElement('div'))
  humanContainer.classList.add('player-container', 'human')
  humanTitle.classList.add('player-title')
  humanTitle.textContent = 'You'
  humanFleet.classList.add('fleet')
  humanBoard.classList.add('board')
  const computerContainer = container.appendChild(document.createElement('div'))
  const computerTitle = computerContainer.appendChild(document.createElement('div'))
  const computerBoard = computerContainer.appendChild(document.createElement('div'))
  const computerFleet = computerContainer.appendChild(document.createElement('div'))
  computerContainer.classList.add('player-container', 'computer')
  computerTitle.classList.add('player-title')
  computerTitle.textContent = 'Computer'
  computerFleet.classList.add('fleet')
  computerBoard.classList.add('board')
  const humanFields = []
  const computerFields = []
  for (let x = 0; x < 10; x++) {
    humanFields[x] = []
    computerFields[x] = []
    for (let y = 0; y < 10; y++) {
      humanFields[x].push(humanBoard.appendChild(document.createElement('div')))
      computerFields[x].push(computerBoard.appendChild(document.createElement('div')))
      humanFields[x][y].classList.add('field', 'human', 'not-hit', `xy${x}${y}`)
      computerFields[x][y].classList.add('field', 'computer', 'not-hit', `xy${x}${y}`)
      computerFields[x][y].addEventListener('click', (evt) => {
        game.humanTurn(evt)
      })
      human.board.getField(x, y).empty === true ? humanFields[x][y].classList.add('empty') : humanFields[x][y].classList.add('ship')
      computer.board.getField(x, y).empty === true ? computerFields[x][y].classList.add('empty') : computerFields[x][y].classList.add('ship')
    }
  }
  const shipTypes = human.fleet.getFleet()
  const humanProgressBars = []
  const computerProgressBars = []
  for (const item of shipTypes) {
    const divHuman = humanFleet.appendChild(document.createElement('div'))
    const divComputer = computerFleet.appendChild(document.createElement('div'))
    const textHuman = divHuman.appendChild(document.createElement('div'))
    const textComputer = divComputer.appendChild(document.createElement('div'))
    const text = item.name + ' Length: ' + item.length
    textHuman.textContent = text
    textComputer.textContent = text
    textHuman.classList.add('ship-text')
    textComputer.classList.add('ship-text')
    const humanProgressBar = divHuman.appendChild(document.createElement('div'))
    const computerProgressBar = divComputer.appendChild(document.createElement('div'))
    humanProgressBar.classList.add('progress-bar', item.name)
    computerProgressBar.classList.add('progress-bar', item.name)
    humanProgressBars.push(humanProgressBar)
    computerProgressBars.push(computerProgressBar)
  }

  function setHit (name, x, y) {
    if (name === 'human') {
      humanFields[x][y].classList.add('hit')
      humanFields[x][y].classList.remove('not-hit')
    }
    if (name === 'computer') {
      computerFields[x][y].classList.add('hit')
      computerFields[x][y].classList.remove('not-hit')
    }
  }
  function setMessage (string) {
    messageQueue.push(string)
    if (!messageBox.classList.contains('new')) { // Tests indirectly if there is an active timeout
      messageBox.textContent = messageQueue.shift()
      messageBox.classList.add('new')
      setTimeout(setMessageCallback, 2500)
    }
  }
  function setMessageCallback () { // Callback for timeout in function setMessage
    messageBox.classList.remove('new')
    if (messageQueue.length > 0) {
      messageBox.textContent = messageQueue.shift()
      messageBox.classList.add('new')
      setTimeout(setMessageCallback, 2500)
    }
  }
  function displaySunk (fields, name) {
    fields.forEach(([x, y]) => {
      if (name === 'human') {
        humanFields[x][y].classList.remove('hit')
        humanFields[x][y].classList.add('sunk')
      }
      if (name === 'computer') {
        computerFields[x][y].classList.remove('hit')
        computerFields[x][y].classList.add('sunk')
      }
    })
    if (name === 'human') {
      const status = human.fleet.getFleet()
      status.forEach(element => {
        for (let i = 0; i < humanProgressBars.length; i++) {
          if (humanProgressBars[i].classList.contains(element.name)) {
            const width = (element.numberSunk / element.number) * 100
            humanProgressBars[i].style.setProperty('--width', width)
          }
        }
      })
    }
    if (name === 'computer') {
      const status = computer.fleet.getFleet()
      status.forEach(element => {
        for (let i = 0; i < computerProgressBars.length; i++) {
          if (computerProgressBars[i].classList.contains(element.name)) {
            const width = (element.numberSunk / element.number) * 100
            computerProgressBars[i].style.setProperty('--width', width)
          }
        }
      })
    }
  }
  return { setHit, setMessage, displaySunk }
}

export { createUI }
