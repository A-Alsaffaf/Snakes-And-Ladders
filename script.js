/*-------------------------------- Constants --------------------------------*/
const ladderEnts = [1, 4, 9, 21, 28, 51, 72, 80] // stores ladders entrances positions
const ladderExits = [38, 14, 31, 42, 84, 67, 91, 99] // stores ladders exits positions

const snakeEnts = [17, 54, 62, 64, 87, 93, 95, 98] // stores snakes entrances positions
const snakeExits = [7, 34, 19, 60, 36, 73, 75, 79] // stores snakes entrances positions

const players = [
  {
    piece: '💀',
    oldPos: 0,
    position: 0
  },
  {
    piece: '👽',
    oldPos: 0,
    position: 0
  },
  {
    piece: '🚀',
    oldPos: 0,
    position: 0
  },
  {
    piece: '🔥',
    oldPos: 0,
    position: 0
  }
]

/*---------------------------- Variables (state) ----------------------------*/

let diceNum
let turn
let isWinner
let winner
let board
let playerIndex

/*------------------------ Cached Element References ------------------------*/

const boardCellEls = document.querySelectorAll('.cell')
const diceButtonEl = document.querySelector('#diceBtn')
const msgEl = document.querySelector('#msg')
const rstBtnEl = document.querySelector('#rstButton')
const currentPositionsScreenEls = document.querySelectorAll('.current-position')
const diceImageEl = document.querySelector('#diceImg')
const piecesSideEls = document.querySelectorAll('.piece')

/*-------------------------------- Functions --------------------------------*/

// render a fresh game after initalizing
const renderGame = () => {
  updateMsg()
  appendBoard()
  updateCurrentPositionsScreen()
  hidePiece()
  diceImageEl.src = 'BlackBackground.png'
}

// initialize the game from starting point
const initializeGame = () => {
  board = Array(100).fill('')
  players.forEach((player) => {
    player.oldPos = 0
    player.position = 0
  })
  diceNum = undefined
  playerIndex = 0
  isWinner = false
  turn = players[0]
  renderGame()
}

// update the message if the player wins or pring player turn if there is no winner
const updateMsg = () => {
  if (isWinner === true) {
    msgEl.textContent = `Congratulation ${winner}, You have reached 100 and Won`
  } else if (diceNum === 6) {
    msgEl.textContent = `It's Player ${turn.piece} turn Again`
  } else {
    msgEl.textContent = `It's Player ${turn.piece} turn`
  }
}

// displaying and updating current positions of each piece to clarify their location on the game for the user
const updateCurrentPositionsScreen = () => {
  currentPositionsScreenEls.forEach((pos, index) => {
    if (index == playerIndex) {
      pos.textContent = `${players[index].piece} Current Position: ${players[index].position}`
    } else {
      pos.textContent = `${players[index].piece} Current Position: ${players[index].position}`
    }
  })
}

// hide the pieces from the initialized area and move them to the baord
const hidePiece = () => {
  piecesSideEls.forEach((piece, index) => {
    if (players[index].position !== 0) {
      piece.textContent = ''
    } else {
      piece.textContent = players[index].piece
    }
  })
}

// empty the baord after initalizing or resetting the game by syncronizng an empty 100 cell array to the actual baord
const appendBoard = () => {
  board.forEach((cell, index) => {
    boardCellEls[index].textContent = cell
  })
}

// generating the random number for the dice
const genRandomNum = () => {
  diceNum = Math.floor(Math.random() * 6) + 1
  diceImageEl.src = `Face${diceNum}.png`
}

// update the current and older positions of the piece
const updatePos = () => {
  turn.oldPos = turn.position
  turn.position = turn.position + diceNum
}

// checks of the player landed on a ladder position and update the player position if landed
const isPlayerAtLadder = () => {
  ladderEnts.forEach((entrance, index) => {
    if (turn.position == entrance) {
      turn.position = ladderExits[index]
    }
  })
}

// checks of the player landed on a snake position and update the player position if landed
const isPlayerAtSnake = () => {
  snakeEnts.forEach((trap, index) => {
    if (turn.position == trap) {
      turn.position = snakeExits[index]
    }
  })
}

// moving and updating the piece location on the board depending on the current and older positions
const movePiece = () => {
  boardCellEls.forEach((cell) => {
    if (cell.id == turn.oldPos) {
      if (cell.textContent.includes(turn.piece)) {
        cell.textContent = cell.textContent.replace(turn.piece, '')
      }
    }

    isPlayerAtLadder()
    isPlayerAtSnake()

    if (cell.id == turn.position) {
      cell.textContent += turn.piece
    }
  })
}

// switches the platyer turn if the dice number was not 6
const switchTurn = () => {
  if (diceNum === 6) {
    return
  } else {
    playerIndex = (playerIndex + 1) % players.length
    turn = players[playerIndex]
  }
}

// check if there is a winner who reached last cell
const checkWinner = () => {
  if (turn.position === 100) {
    isWinner = true
    winner = turn.piece
  }
  return
}

// a function to call all the required functions if there is no winner and handle user click on the button for rolling the dice and play
const handlePlayClick = () => {
  if (isWinner === true) {
    return
  } else {
    genRandomNum()
    if (turn.position + diceNum <= 100) {
      updatePos()
      movePiece()
      checkWinner()
    }
    updateCurrentPositionsScreen()
    hidePiece()
    switchTurn()
    updateMsg()
  }
}
/*----------------------------- Event Listeners -----------------------------*/

// handle user click on the button to roll the dice
diceButtonEl.addEventListener('click', () => {
  handlePlayClick()
})

// handle user click to restart the game
rstBtnEl.addEventListener('click', () => {
  initializeGame()
})
