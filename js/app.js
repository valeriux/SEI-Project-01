document.addEventListener('DOMContentLoaded', () => {

  const wrap = document.querySelector('.wrap')
  const width = 13
  const squares = []
  let playerIndex = 162
  let direction = 'forward'
  let currentStep = 0

  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('DIV')
    squares.push(square)
    wrap.appendChild(square)
  }

  squares[playerIndex].classList.add('player')
  squares[playerIndex].setAttribute('data-direction', direction)
  squares[playerIndex].setAttribute('data-step', currentStep)

  function move() {
    // update the current step (should count from 0 - 3, then start again)
    currentStep = currentStep === 3 ? 0 : currentStep + 1
    // find the square with the class of "player"
    const player = squares.find(square => square.classList.contains('player'))
    // remove the class of player from that square
    player.classList.remove('player')

    // add the class of player to square the player should move to
    squares[playerIndex].classList.add('player')
    // update the direction (for styling)
    squares[playerIndex].setAttribute('data-direction', direction)
    // update the current step (for styling)
    squares[playerIndex].setAttribute('data-step', currentStep)
  }

  document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
      case 37:
        // left
        if(playerIndex % width > 0) {
          playerIndex--
          direction = 'backward'
          move()
        }
        break

      case 39:
        // right
        if(playerIndex % width < width - 1) {
          playerIndex++
          direction = 'forward'
          move()
        }
        break

    }
  })
})
