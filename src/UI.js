import { human, computer, game } from './index'

function createUI () {
  const messageQueue = []                                 // Queue for messages to display by function setMessage
  const body = document.querySelector('body')
  const container = body.appendChild(document.createElement('div'))
  const title = container.appendChild(document.createElement('div'))
  title.classList.add('title')
  title.textContent = 'Zeeslag'
  const messageBox = container.appendChild(document.createElement('div'))
  messageBox.classList.add('messageBox')
  const humanBoard = container.appendChild(document.createElement('div'))
  const computerBoard = container.appendChild(document.createElement('div'))
  humanBoard.classList.add('board')
  computerBoard.classList.add('board')
  const humanFields = []
  const computerFields = []
  for (let x = 0; x < 10; x++) {
    humanFields[x] = []
    computerFields[x] = []
    for (let y = 0; y < 10; y++) {
      humanFields[x].push(humanBoard.appendChild(document.createElement('div')))
      computerFields[x].push(computerBoard.appendChild(document.createElement('div')))
      humanFields[x][y].classList.add('field', 'human', 'not-hit',`xy${x}${y}`)
      computerFields[x][y].classList.add('field', 'computer', 'not-hit', `xy${x}${y}`)
      computerFields[x][y].addEventListener('click', (evt) => {
        game.humanTurn(evt)
      })
      human.board.getField(x, y).empty === true ? humanFields[x][y].classList.add('empty') : humanFields[x][y].classList.add('ship')
      computer.board.getField(x, y).empty === true ? computerFields[x][y].classList.add('empty') : computerFields[x][y].classList.add('ship')
    }
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
    if (!messageBox.classList.contains('new')) {          // Tests indirectly if there is an active timeout
    messageBox.textContent = messageQueue.shift()
    messageBox.classList.add('new')
    setTimeout(setMessageCallback, 2500)
    }
  }
  function setMessageCallback () {                        // Callback for timeout in function setMessage
    messageBox.classList.remove('new')
    if (messageQueue.length > 0){
    messageBox.textContent = messageQueue.shift()
    messageBox.classList.add('new')
    setTimeout(setMessageCallback, 2500)
    }
  }
  return { setHit, setMessage }
}

export { createUI }


