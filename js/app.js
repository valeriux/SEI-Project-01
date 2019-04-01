document.addEventListener('DOMContentLoaded', () => {

  //Creating my Board "wrap" 13*13.
  const wrap = document.querySelector('.wrap')
  const width = 13
  const squares = []

  //This for is to create my div tags.
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    wrap.appendChild(square)
  }

  //Index for my player.
  let playerIndex = 162
  squares[playerIndex].classList.add('player')


  function move() {
    // Find the square with the class of "player"
    const player = squares.find(square => square.classList.contains('player'))
    // Remove the class of player from that square
    player.classList.remove('player')
    // Add the class of player to square the player should move to
    squares[playerIndex].classList.add('player')
  }


  document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
      case 37:
        // Left
        if(playerIndex % width > 0) {
          playerIndex--
          move()
        }
        break

      case 39:
        // Right
        if(playerIndex % width < width - 1) {
          playerIndex++
          move()
        }
        break
    }
  })

  // Aliens//
  let aliensArray = [1, 4, 7, 10,
    13, 16, 19, 22,
    25, 28, 31, 34]

  aliensArray.forEach(aliens => {
    squares[aliens].classList.add('aliens')
  })

  setInterval(() => {
    aliensArray.forEach(aliens => {
      squares[aliens].classList.remove('aliens')
    })
    aliensArray = aliensArray.map(aliens => aliens + 1)

    aliensArray.forEach(aliens => {
      squares[aliens].classList.add('aliens')
    })
  }, 1000)


  //Movement//
  let movement = []


  function createLaser() {
    const element = document.createElement('img')
    element.src = 'img/laser-blue-1.png'
    element.className = 'laser'

  }


})
