class Player {
  // sets variables which are inserted into these values from main page
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  } // constructor function end

  // draws player
  drawRect() {
    canvasContext.fillStyle = this.c;
    canvasContext.fillRect(this.x, this.y, this.w, this.h);
  } //drawRect function end

  // codes for player movement
  move() {
    // detects whether desired direction is a wall or not, aka whether player can move there
    // remembers what number is under player on the array map so it can be replaced when the player moves on
    if (wKeyPressed && arrayMap[playerLocation - 50] != 2) {
      arrayMap[playerLocation] = steppedOn;
      steppedOn = arrayMap[playerLocation - 50];
      wKeyPressed = false;
      aKeyPressed = false;
      sKeyPressed = false;
      dKeyPressed = false;
      playerLocation -= 50;
    }
    if (aKeyPressed && arrayMap[playerLocation - 1] != 2) {
      arrayMap[playerLocation] = steppedOn;
      steppedOn = arrayMap[playerLocation - 1];
      wKeyPressed = false;
      aKeyPressed = false;
      sKeyPressed = false;
      dKeyPressed = false;
      playerLocation--;
    }
    if (sKeyPressed && arrayMap[playerLocation + 50] != 2) {
      arrayMap[playerLocation] = steppedOn;
      steppedOn = arrayMap[playerLocation + 50];
      wKeyPressed = false;
      aKeyPressed = false;
      sKeyPressed = false;
      dKeyPressed = false;
      playerLocation += 50;
    }
    if (dKeyPressed && arrayMap[playerLocation + 1] != 2) {
      arrayMap[playerLocation] = steppedOn;
      steppedOn = arrayMap[playerLocation + 1];
      wKeyPressed = false;
      aKeyPressed = false;
      sKeyPressed = false;
      dKeyPressed = false;
      playerLocation++;
    }
  } // move function end

  // codes for the powerup
  power() {
    // detects when powerup is picked up and sets a timer for it
    if (steppedOn == 7) {
      invincibility = true;
      // stops powerup from being drawn again
      steppedOn = 0;
      setTimeout(function () {
        invincibility = false;
      }, 10000);
    }
    // changes player colour while invincible
    if (invincibility) {
      this.c = 'pink';
    } else {
      this.c = 'lime';
    }
  } // power function end
  // sorts high score variables
  sort() {
    // retrieves values from local memory for how many values there are
    for (var i = 0; i < localStorage.length / 3; i++) {
      highscores[i][0] = localStorage.getItem("user" + i);
      highscores[i][1] = localStorage.getItem("score" + i);
      highscores[i][2] = localStorage.getItem("difficulty" + i);
    }
    // moves scores into separate array and sorts them from biggest to smallest
    for (var i = 0; i < localStorage.length / 3; i++) {
      sort[i] = highscores[i][1];
      sort.sort(function (a, b) {
        return b - a
      });
    }
    // detects which score belongs to which user and stores these values in local memory in order of highest score to lowest
    for (var p = 0; p < localStorage.length / 3; p++) {
      for (var i = 0; i < localStorage.length / 3; i++) {
        if (sort[p] == highscores[i][1]) {
          localStorage.setItem("user" + p, highscores[i][0]);
          localStorage.setItem("score" + p, highscores[i][1]);
          localStorage.setItem("difficulty" + p, highscores[i][2]);
        }
      }
    }
  } // sort function end

  // runs win screen
  win() {
    // when player reaches end
    if (steppedOn == 4) {
      if (easyClicked || mediumClicked || hardClicked) {
        // makes the score only be saved once
        var scoreSaved = false;
        // retrieves scores from local memory
        if (localStorage.length > 0 && localStorage.length < 21) {
          for (var i = 0; i < localStorage.length / 3; i++) {
            highscores[i][0] = localStorage.getItem("user" + i);
            highscores[i][1] = localStorage.getItem("score" + i);
            highscores[i][2] = localStorage.getItem("difficulty" + i);
          }
          // if high score board is not full it fills up the next available slot
          for (var i = 0; i < localStorage.length / 3 + 1; i++) {
            if (highscores[i].length == 0 && scoreSaved == false) {
              localStorage.setItem("user" + i, user);
              localStorage.setItem("score" + i, score);
              localStorage.setItem("difficulty" + i, difficulty);
              scoreSaved = true;
            }
          }
          // sorts scores biggest to smallest
          this.sort()
        } else if (localStorage.length == 0) {
          // if no high scores, stores score to memory
          localStorage.setItem("user0", user);
          localStorage.setItem("score0", score);
          localStorage.setItem("difficulty0", difficulty);
          scoreSaved = true;
        } else if (score > highscores[6][1]) {
          // replaces value at bottom of scoreboard if greater than it and then resorts
          localStorage.setItem("user6", user);
          localStorage.setItem("score6", score);
          localStorage.setItem("difficulty6", difficulty);
          this.sort();
        }
        // ends game movement
        easyClicked = false;
        mediumClicked = false;
        hardClicked = false;
      }
      // draws win message and displays score
      canvasContext.fillStyle = 'black';
      canvasContext.font = '50px serif';
      canvasContext.textAlign = 'center';
      canvasContext.fillText("You Win!!", canvas.width / 2, canvas.height / 6, canvas.width);
      canvasContext.fillText("Your Score: " + Math.floor(score), canvas.width / 2, canvas.height / 3, canvas.width);
      // draws back to menu button
      colorRect(canvas.width / 2 - 100, canvas.height * 6.5 / 8, 200, 50, 'black');
      colorRect(canvas.width / 2 - 95, canvas.height * 6.5 / 8 + 5, 190, 40, 'white');
      canvasContext.font = '30px serif';
      canvasContext.textAlign = 'center';
      canvasContext.fillStyle = 'black';
      canvasContext.fillText('Back To Menu', canvas.width / 2, canvas.height * 6.5 / 8 + 33);
      // determines hitbox and outcome for if button pressed
      if (mouseX > canvas.width / 2 - 100 && mouseX < canvas.width / 2 + 100 && canvas.height * 6.5 / 8 < mouseY && mouseY < canvas.height * 6.5 / 8 + 50 && mousePressed && user.length > 0) {
        //  refreshes webpage
        location.reload();
      }
      // draws highscore table
      scoreTable();
    }
  } // win function end

  // reduces liveCount of player by 1 when hitting enemy
  dead() {
    steppedOn = 3;
    playerLocation = 550;
    this.c = 'lime';
    liveCount--;
  } // dead function end


  // draws player
  draw() {
    this.x = this.w * (playerLocation - 50 * (Math.floor(playerLocation / 50)));
    this.y = this.h * (Math.floor(playerLocation / 50));
  } // draw function end
}