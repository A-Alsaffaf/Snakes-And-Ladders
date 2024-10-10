const cellEls = document.querySelectorAll('.cell')
let id
cellEls.forEach((cell) => {
  id = cell.id
  cell.innerHTML = id
  console.log(id)
})

console.log("Hey I'm working")
