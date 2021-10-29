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

  win() {
    if (steppedOn == 4) {
      easyClicked = false;
      mediumClicked = false;
      hardClicked = false;
      canvasContext.fillStyle = 'black';
      canvasContext.font = '50px serif';
      canvasContext.textAlign = 'center';
      canvasContext.fillText("You Win!!", canvas.width / 2, canvas.height / 6, canvas.width);
      canvasContext.fillText("Your Score: " + score, canvas.width / 2, canvas.height / 3, canvas.width);
      colorRect(canvas.width / 2 - 100, canvas.height * 6.5 / 8, 200, 50, 'black');
      colorRect(canvas.width / 2 - 95, canvas.height * 6.5 / 8 + 5, 190, 40, 'white');
      canvasContext.font = '30px serif';
      canvasContext.textAlign = 'center';
      canvasContext.fillStyle = 'black';
      canvasContext.fillText('Back To Menu', canvas.width / 2, canvas.height * 6.5 / 8 + 33);
      if (mouseX > canvas.width / 2 - 100 && mouseX < canvas.width / 2 + 100 && canvas.height * 5 / 8 < mouseY && mouseY < canvas.height * 5 / 8 + 50 && mousePressed && user.length > 0) {
        location.reload();
      }
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