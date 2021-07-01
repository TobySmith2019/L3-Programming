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
    if (wKeyPressed && arrayMap[playerLocation - 50] == 0) {
      arrayMap[playerLocation] = 0;
      aKeyPressed = false;
      sKeyPressed = false;
      dKeyPressed = false;
      playerLocation -= 50;
      wKeyPressed = false;
    }
    if (aKeyPressed && arrayMap[playerLocation - 1] == 0) {
      arrayMap[playerLocation] = 0;
      wKeyPressed = false;
      sKeyPressed = false;
      dKeyPressed = false;
      playerLocation--;
      aKeyPressed = false;
    }
    if (sKeyPressed && arrayMap[playerLocation + 50] == 0) {
      arrayMap[playerLocation] = 0;
      wKeyPressed = false;
      aKeyPressed = false;
      dKeyPressed = false;
      playerLocation += 50;
      sKeyPressed = false;
    }
    if (dKeyPressed && arrayMap[playerLocation + 1] == 0) {
      arrayMap[playerLocation] = 0;
      wKeyPressed = false;
      aKeyPressed = false;
      sKeyPressed = false;
      playerLocation++;
      dKeyPressed = false;
    }
  }

  draw() {
    this.x = this.w * (playerLocation - 50 * (Math.floor(playerLocation / 50)));
    this.y = this.h * (Math.floor(playerLocation / 50));
  }
}