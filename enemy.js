class Enemy {
  constructor(x, y, w, h, c, v, xMove, yMove, d, ed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.v =v;
    this.xMove = xMove;
    this.yMove = yMove;
    this.d = d;
    this.ed = ed;
  }

  drawRect() { 
    canvasContext.fillStyle = this.c;
    canvasContext.fillRect(this.x, this.y, this.w, this.h);
  }
  // ed = enemydirection
  move() {
    if (easyClicked && menuDisplay == false) {
      this.v = 1;
    }
    if (mediumClicked && menuDisplay == false) {
      this.v = 2;
    }
    if (hardClicked && menuDisplay == false) {
      this.v = 4;
    }
    this.collision();
    // console.log(this.d);
    if (this.yMove > 0) {
      if (this.ed == false) {
        this.y += this.v;
      } else {
        this.y -= this.v;
      }

      if (Math.floor(this.y / pixelSize) == (this.y / pixelSize) && this.ed == false) {
        this.d++;
      }

      if (Math.floor(this.y / pixelSize) == (this.y / pixelSize) && this.ed == true) {
        this.d--;
      }

      if (this.d > this.yMove) {
        this.ed = true;
      }

      if (this.d < 1) {
        this.ed = false;
      }
    }
    if (this.xMove > 0) {
      if (this.ed == false) {
        this.x += this.v;
      } else {
        this.x -= this.v;
      }

      if (Math.floor(this.x / pixelSize) == (this.x / pixelSize) && this.ed == false) {
        this.d++;
      }

      if (Math.floor(this.x / pixelSize) == (this.x / pixelSize) && this.ed == true) {
        this.d--;
      }

      if (this.d > this.xMove) {
        this.ed = true;
      }

      if (this.d < 1) {
        this.ed = false;
      }
    }
  }

  collision() {
    if (this.x + this.w > player.x && this.x < player.x + player.w && this.y + this.h > player.y && this.y < player.y + player.h && invincibility == false) {
      player.dead();
    }
  }
}