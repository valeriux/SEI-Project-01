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
  //Index for my missiles.

  function shootMissiles() {
    // Get the index of the square above the player
    let missilesIndex = playerIndex - width
    // Get the DOM element of the square above the player
    let missiles = squares[missilesIndex]
    // Add the class of missiles to that square
    missiles.classList.add('missiles')
    // Move missiles up
    const missilesInterval = setInterval(() => {
      console.log(missilesIndex)
      // Remove missiles class from the current square
      missiles.classList.remove('missiles')
      if (missilesIndex - width < 0) clearInterval(missilesInterval)
      else {// Set the new index for the missiles square
        missilesIndex -= width
        // Get the new DOM element of the next square
        missiles = squares[missilesIndex]
        // Add missiles class to the next square up
        missiles.classList.add('missiles')
      }
      //...repeat every 100ms
    }, 100)
  }

  //Next step: Remove when I got shoot
  //function collisionDetection(){
  //  (moveAliens(moves[[moveIndex]].splice(aliens, 1);
  //  }
//  }




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

      case 32:
        // Laser
        shootMissiles()
    }
  })

  // Aliens Array//
  let aliensArray = [1, 4, 7, 10,
    13, 16, 19, 22,
    25, 28, 31, 34,
    37, 40, 43, 46]

  function createAliens(){
    aliensArray.forEach(aliens => {
      squares[aliens].classList.add('aliens')
    })
  }

  createAliens()
  let moveIndex=0
  let moves=[1, 13, -1, -13]


  function moveAliens(movement) {
    aliensArray.forEach(aliens => {
      squares[aliens].classList.remove('aliens')
    })
    aliensArray = aliensArray.map(aliens => aliens + movement)
    aliensArray.forEach(aliens => {
      squares[aliens].classList.add('aliens')
    })
  }

  setInterval(() => {
    moveIndex= moveIndex === 3 ? 0 : moveIndex + 1
    moveAliens(moves[[moveIndex]])
  }, 800)


})
