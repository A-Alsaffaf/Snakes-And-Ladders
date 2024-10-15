// const cellEls = document.querySelectorAll('.cell')
// let id
// cellEls.forEach((cell) => {
//   id = cell.id
//   cell.innerHTML = id
//   console.log(id)
// })

/*-------------------------------- Constants --------------------------------*/
const gldGatesEnt = [1, 4, 9, 21, 28, 51, 72, 80]
const gldGatesExit = [38, 14, 31, 42, 84, 67, 91, 99]
const blkHolesEnt = [17, 54, 62, 64, 87, 93, 95, 98]
const blkHolesExit = [7, 34, 19, 60, 36, 73, 75, 79]

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
let boardCellEls = []
/*------------------------ Cached Element References ------------------------*/
boardCellEls = document.querySelectorAll('.cell')
const diceButtonEl = document.querySelector('#diceBtn')
const msgEl = document.querySelector('#msg')
const rstBtnEl = document.querySelector('#rstButton')
const displayDiceEl = document.querySelector('#diceScreen').children
const currentPositionsScreen =
  document.querySelector('#current-positions').children
console.log(currentPositionsScreen)
const diceImageEl = document.querySelector('#diceImg')
/*-------------------------------- Functions --------------------------------*/
const renderGame = () => {
  updateMsg()
  syncBoard()
  diceImageEl.src = '/IMGs/BlackBackground.png'
}

const initializeGame = () => {
  board = Array(100).fill('')
  players.forEach((player) => {
    player.oldPos = 0
    player.position = 0
  })
  playerIndex = 0
  isWinner = false
  turn = players[0]
  renderGame()
}

const updateMsg = () => {
  if (isWinner === true) {
    msgEl.textContent = `Congratulation ${winner}, You have reached 100 and Won`
  } else {
    msgEl.textContent = `It's Player ${turn.piece} turn`
  }
}

const syncBoard = () => {
  board.forEach((cell, index) => {
    boardCellEls[index].textContent = cell
  })
}

const displayTheDice = () => {
  displayDiceEl.forEach((dice, index) => {
    dice
  })
}

const genRandomNum = () => {
  diceNum = Math.floor(Math.random() * 6) + 1
  console.log('The random number was: ', diceNum)

  // displayDiceEl.textContent = diceNum
  diceImageEl.src = `/IMGs/Dice Images/Face${diceNum}.png`
}

const calPos = () => {
  turn.oldPos = turn.position
  console.log(turn.piece, turn.oldPos)
  turn.position = turn.position + diceNum
  console.log(`${turn.piece} Current Position`, turn.position)
}

const isPlayerAtGate = () => {
  gldGatesEnt.forEach((entrance, index) => {
    if (turn.position == entrance) {
      turn.position = gldGatesExit[index]
      console.log(
        `${turn.piece} position is ${turn.position} and exit value is ${gldGatesExit[index]}`
      )
    }
  })
}

const isPlayerAtBlackHole = () => {
  blkHolesEnt.forEach((trap, index) => {
    if (turn.position == trap) {
      turn.position = blkHolesExit[index]
      console.log(
        `${turn.piece} position is ${turn.position} and trap value is ${blkHolesExit[index]}`
      )
    }
  })
}

const movePiece = () => {
  boardCellEls.forEach((cell) => {
    if (cell.id == turn.oldPos) {
      if (cell.textContent.includes(turn.piece)) {
        cell.textContent = cell.textContent.replace(turn.piece, '')
      }
    }

    isPlayerAtGate()
    isPlayerAtBlackHole()

    if (cell.id == turn.position) {
      cell.textContent += turn.piece
    }
  })
}

const switchTurn = () => {
  if (diceNum === 6) {
    return
  } else {
    playerIndex = (playerIndex + 1) % players.length
    console.log(playerIndex)

    turn = players[playerIndex]
    console.log(turn)
  }
}

const checkWinner = () => {
  if (turn.position === 100) {
    isWinner = true
    winner = turn.piece
  }

  return
}

const handlePlayClick = () => {
  if (isWinner === true) {
    return
  } else {
    genRandomNum()
    if (turn.position + diceNum <= 100) {
      calPos()
      movePiece()
      checkWinner()
    }
    switchTurn()
    updateMsg()
  }
}
/*----------------------------- Event Listeners -----------------------------*/
diceButtonEl.addEventListener('click', (event) => {
  handlePlayClick()
})

rstBtnEl.addEventListener('click', (event) => {
  initializeGame()
})
