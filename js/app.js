document.addEventListener('DOMContentLoaded', () => {

  ///////////////Creating my div tags my board name is "wrap" 13*13 ////////////
  const wrap = document.querySelector('.wrap')
  const width = 13
  const squares = []
  //////////////////////////////////////////////////////////////////////////////
  const missileAudio    = document.querySelector('audio')
  const btnStart        = document.querySelector('.button')
  const secondScreen    = document.querySelector('.second_screen')
  const scoreBoard      = document.querySelector('.score')
  const showFinalScore  = document.querySelector('.show-final-score')
  const livesboard      = document.querySelector('.lives')

  const moves=[1, 13, -1, -13]
  let moveIndex = 0
  let score = 0
  let timeUp = false
  let alienMoveInterval = null
  let lives = 3

  //////////////This for is to create my div tags on my wrap////////////////////
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    wrap.appendChild(square)
  }

  //Index for my player position 162
  let playerIndex = 162
  squares[playerIndex].classList.add('player')

  //Creating my function move to take the position of my player.
  function move() {
    // Find the square with the class of "player"
    const player = squares.find(square => square.classList.contains('player'))
    // Remove the class of player from that square
    player.classList.remove('player')
    // Add the class of player to square the player should move to
    squares[playerIndex].classList.add('player')
  }

  function alienWasShot(missilesIndex, missilesInterval) {
    // //Remove Missiles class.
    squares[missilesIndex].classList.remove('missiles')
    scoreBoard.classList.add('add')
    score++
    scoreBoard.textContent = score
    clearInterval(missilesInterval)
    const index = aliensArray.indexOf(missilesIndex)
    //Splice: Adds/removes items to/from an array, and returns the removed item//
    aliensArray.splice(index,1)
    // //Remove Alien class.
    squares[missilesIndex].classList.remove('aliens')
    squares[missilesIndex].classList.remove('missiles')
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
      /////////////////Remove my aliens when they Alien got shot////////////////
      ///Clear missilesInterval///
      if(squares[missilesIndex].classList.contains('aliens')){
        alienWasShot(missilesIndex, missilesInterval)
      }
    }, 60)//Repeat every 60ms//
  }

  const keydownHandler = (e) => {
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
        // Laser SpaceBar
        shootMissiles()
    }
  }
  document.addEventListener('keydown', keydownHandler)

  // Creating my Aliens Array//
  let aliensArray = []

  // Function to create my aliens.//
  function createAliens(){
    squares.forEach((square, index) => {
      square.classList.remove('aliens')
      if(aliensArray.includes(index)) square.classList.add('aliens')
    })
  }

  function moveAliens(movement) {
    aliensArray.forEach(aliens => {
      squares[aliens].classList.remove('aliens')
    })
    aliensArray = aliensArray.map(aliens => aliens + movement)
    aliensArray.forEach(aliens => {
      squares[aliens].classList.add('aliens')
    })
  }

  //Function activated when I click my btnStart.
  function start() {
    clearInterval(alienMoveInterval)
    aliensArray = [
      1, 4, 7, 10,
      13, 16, 19, 22,
      25, 28, 31, 34,
      37, 40, 43, 46,
      49, 52, 55, 58,
      61, 64, 67, 70,
      73, 76
    ]
    createAliens()
    moveIndex = 0
    alienMoveInterval = setInterval(() => {
      moveIndex= moveIndex === 3 ? 0 : moveIndex + 1
      moveAliens(moves[moveIndex])
    }, 500)//Interval time for my aliens.

    score=0
    scoreBoard.textContent = score
    timeUp = false
    //scoreBoard.classList.remove('add')
    secondScreen.classList.add('hide')//Hide the secondScreen when the time is end.
    // Initializing music
    setTimeout(() => {//Setting my timeout when my time is finish.
      timeUp = true
      clearInterval(alienBombInterval)
      document.removeEventListener('keydown', keydownHandler)
      secondScreen.classList.remove('hide')//The time is end when the timeup = true and remove my secondScreen.
      //My condition if score is >0 showFinalScore added in my Welcome screen.
      if (score > 0) {//If score > 0 only show final score.
        showFinalScore.classList.add('show')
        //If score>8 show Excellent message.
        const message = 'Your score is: ' + score + (score >= 8 ? ' You score is good!': '')
        showFinalScore.textContent = message
      }
      clearInterval(alienMoveInterval)
    }, 9000)
  }
  //When btnStart is click I activate my class start.
  btnStart.addEventListener('click', start)


  //Function for dropping bombs
  function dropBomb(bombIndex) {
    let missilesIndex = bombIndex + width
    let missile = squares[missilesIndex]
    const missilesInterval = setInterval(() => {
      if (missile) missile.classList.remove('bomb')
      if (missilesIndex + width >= width**2) clearInterval(missilesInterval)
      else if (missile) {
        missilesIndex += width
        missile = squares[missilesIndex]
        squares[missilesIndex].classList.add('bomb')
      }
    }, 200)
  }
  //////////////////New Set Interval for Alien Bombs///////////////////////////
  //Declaring a const for bomIndex and choosing my aliens randomly.//
  const alienBombInterval = setInterval(() =>{
    const bombIndex = aliensArray[Math.floor(Math.random()*(aliensArray.length))]
    dropBomb(bombIndex)
  },1000)
  //Player and Bomb collision
  function collision() {
    const collisionInterval = setInterval(() => {
    const currentPlayer = squares[playerIndex]
      if (currentPlayer.classList.contains('bomb')) {
        currentPlayer.classList.remove('bomb')

        if (lives > 0) {
          lives--
          livesboard.textContent = lives
        }
        if (lives === 0) {
          console.log('finished')
          clearInterval(collisionInterval)
          // stop EVERYTHING...
          currentPlayer.classList.remove('player')
        }
      }
    }, 100)
  }

  collision()
})
