class Player {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  drawRect() {
    canvasContext.fillStyle = this.c;
    canvasContext.fillRect(this.x, this.y, this.w, this.h);
  }

  move() {
    if (wKeyPressed && arrayMap[playerLocation - 50] != 2) {
      lastKeyPressed = 1;
      arrayMap[playerLocation] = steppedOn;
      steppedOn = arrayMap[playerLocation - 50];
      aKeyPressed = false;
      sKeyPressed = false;
      dKeyPressed = false;
      playerLocation -= 50;
      wKeyPressed = false;
    }
    if (aKeyPressed && arrayMap[playerLocation - 1] != 2) {
      lastKeyPressed = 2;
      arrayMap[playerLocation] = steppedOn;
      steppedOn = arrayMap[playerLocation - 1];
      wKeyPressed = false;
      sKeyPressed = false;
      dKeyPressed = false;
      playerLocation--;
      aKeyPressed = false;
    }
    if (sKeyPressed && arrayMap[playerLocation + 50] != 2) {
      lastKeyPressed = 3;
      arrayMap[playerLocation] = steppedOn;
      steppedOn = arrayMap[playerLocation + 50];
      wKeyPressed = false;
      aKeyPressed = false;
      dKeyPressed = false;
      playerLocation += 50;
      sKeyPressed = false;
    }
    if (dKeyPressed && arrayMap[playerLocation + 1] != 2) {
      lastKeyPressed = 4;
      arrayMap[playerLocation] = steppedOn;
      steppedOn = arrayMap[playerLocation + 1];
      wKeyPressed = false;
      aKeyPressed = false;
      sKeyPressed = false;
      playerLocation++;
      dKeyPressed = false;
    }
  }

  power() {
    if (invincibility) {
      this.c = 'pink';
    } else {
      this.c = 'lime';
    }
    if (steppedOn == 7) {
      invincibility = true;
      steppedOn = 0;
      setTimeout(function () {
        invincibility = false;
      }, 10000);
    }
  }

  sort() {
    for (var i = 0; i < localStorage.length / 3; i++) {
      highscores[i][0] = localStorage.getItem("user" + i);
      highscores[i][1] = localStorage.getItem("score" + i);
      highscores[i][2] = localStorage.getItem("difficulty" + i);
    }
    for (var i = 0; i < localStorage.length / 3; i++) {
      sort[i] = highscores[i][1];
      sort.sort(function (a, b) {
        return b - a
      });
    }
    for (var p = 0; p < localStorage.length / 3; p++) {
      for (var i = 0; i < localStorage.length / 3; i++) {
        if (sort[p] == highscores[i][1]) {
          localStorage.setItem("user" + p, highscores[i][0]);
          localStorage.setItem("score" + p, highscores[i][1]);
          localStorage.setItem("difficulty" + p, highscores[i][2]);
        }
      }
    }
  }

  win() {
    if (steppedOn == 4) {
      if (easyClicked || mediumClicked || hardClicked) {
        var scoreSaved = false;
        if (localStorage.length > 0 && localStorage.length < 21) {
          for (var i = 0; i < localStorage.length / 3; i++) {
            highscores[i][0] = localStorage.getItem("user" + i);
            highscores[i][1] = localStorage.getItem("score" + i);
            highscores[i][2] = localStorage.getItem("difficulty" + i);
          }
          for (var i = 0; i < localStorage.length / 3 + 1; i++) {
            if (highscores[i].length == 0 && scoreSaved == false) {
              localStorage.setItem("user" + i, user);
              localStorage.setItem("score" + i, score);
              localStorage.setItem("difficulty" + i, difficulty);
              scoreSaved = true;
            }
          }
          this.sort()
        } else if (localStorage.length == 0) {
          localStorage.setItem("user0", user);
          localStorage.setItem("score0", score);
          localStorage.setItem("difficulty0", difficulty);
          scoreSaved = true;
        } else {
          localStorage.setItem("user6", user);
          localStorage.setItem("score6", score);
          localStorage.setItem("difficulty6", difficulty);
          this.sort();
        }
        easyClicked = false;
        mediumClicked = false;
        hardClicked = false;
        var test = localStorage.getItem("difficulty" + user + score);
        console.log(test);
      }
      canvasContext.fillStyle = 'black';
      canvasContext.font = '50px serif';
      canvasContext.textAlign = 'center';
      canvasContext.fillText("You Win!!", canvas.width / 2, canvas.height / 6, canvas.width);
      canvasContext.fillText("Your Score: " + Math.floor(score), canvas.width / 2, canvas.height / 3, canvas.width);
      colorRect(canvas.width / 2 - 100, canvas.height * 6.5 / 8, 200, 50, 'black');
      colorRect(canvas.width / 2 - 95, canvas.height * 6.5 / 8 + 5, 190, 40, 'white');
      canvasContext.font = '30px serif';
      canvasContext.textAlign = 'center';
      canvasContext.fillStyle = 'black';
      canvasContext.fillText('Back To Menu', canvas.width / 2, canvas.height * 6.5 / 8 + 33);
      if (mouseX > canvas.width / 2 - 100 && mouseX < canvas.width / 2 + 100 && canvas.height * 6.5 / 8 < mouseY && mouseY < canvas.height * 6.5 / 8 + 50 && mousePressed && user.length > 0) {
        location.reload();
      }
      // highscores[0][0] = user; 
      // highscores[0][1] = score; 
      // highscores[0][2] = difficulty; 
      scoreTable();
    }
  }

  draw() {
    this.x = this.w * (playerLocation - 50 * (Math.floor(playerLocation / 50)));
    this.y = this.h * (Math.floor(playerLocation / 50));
  }

  dead() {
    steppedOn = 3;
    playerLocation = 550;
    this.c = 'lime';
    liveCount--;
  }
}