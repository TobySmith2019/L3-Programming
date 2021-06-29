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
        if (dKeyPressed) {
            playerLocation ++;
            this.x += this.w;
            dKeyPressed = false;
        }
    }

    draw() {
      this.x = this.w * (playerLocation - 50 * (Math.floor(playerLocation / 50 )));
      this.y = this.h * (Math.floor(playerLocation / 50));
    }
}