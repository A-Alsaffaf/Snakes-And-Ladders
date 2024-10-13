// const cellEls = document.querySelectorAll('.cell')
// let id
// cellEls.forEach((cell) => {
//   id = cell.id
//   cell.innerHTML = id
//   console.log(id)
// })

/*-------------------------------- Constants --------------------------------*/
const gldGatesEnt = [1,4,9,21,28,51,72,80]
const gldGatesExit = [38,14,31,42,67,84,91,99]
const blkHolesEnt = [17,54,62,64,87,93,95,98]
const blkHolesExit = [7,34,19,60,36,73,75,79]

/*---------------------------- Variables (state) ----------------------------*/
let dicNum
let turn
let winner
// let board = Array(100).fill("");
let p1
let p2
/*------------------------ Cached Element References ------------------------*/
const boardCellEls = document.querySelectorAll(".cell")
const diceButtonEl = document.querySelector("#diceBtn")
const msgEl = document.querySelector("#msg")
const rstBtnEl = document.querySelector("#rstButton") 
const displayDiceEl = document.querySelector("#diceScreen")
/*-------------------------------- Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
