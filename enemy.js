class Enemy {
  // assigns enemy vars from main page
  constructor(x, y, w, h, c, v, xMove, yMove, d, ed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.v = v;
    this.xMove = xMove;
    this.yMove = yMove;
    this.d = d;
    this.ed = ed;
  } // constructor function end

  // draws enemies
  drawRect() {
    canvasContext.fillStyle = this.c;
    canvasContext.fillRect(this.x, this.y, this.w, this.h);
  } // drawRect function end

  // ed = enemydirection
  move() {
    // determines speed depending on difficulty
    if (easyClicked && menuDisplay == false) {
      this.v = 1;
    }
    if (mediumClicked && menuDisplay == false) {
      this.v = 2;
    }
    if (hardClicked && menuDisplay == false) {
      this.v = 4;
    }
    // runs function for if player touches enemy
    this.collision();

    // controls path movement
    if (this.yMove > 0) {
      // if direction, move certain way
      if (this.ed == false) {
        this.y += this.v;
      } else {
        this.y -= this.v;
      }

      // determines direction of movement
      if (Math.floor(this.y / PIXEL_SIZE) == (this.y / PIXEL_SIZE) && this.ed == false) {
        this.d++;
      }
      if (Math.floor(this.y / PIXEL_SIZE) == (this.y / PIXEL_SIZE) && this.ed == true) {
        this.d--;
      }

      // flips direction when reached end of path
      if (this.d > this.yMove) {
        this.ed = true;
      }
      if (this.d < 1) {
        this.ed = false;
      }
    }

    // determines movement in the x plane
    if (this.xMove > 0) {
      // if direction, move certain way
      if (this.ed == false) {
        this.x += this.v;
      } else {
        this.x -= this.v;
      }

      // determines direction of movement
      if (Math.floor(this.x / PIXEL_SIZE) == (this.x / PIXEL_SIZE) && this.ed == false) {
        this.d++;
      }
      if (Math.floor(this.x / PIXEL_SIZE) == (this.x / PIXEL_SIZE) && this.ed == true) {
        this.d--;
      }

      // flips direction when reached end of path
      if (this.d > this.xMove) {
        this.ed = true;
      }
      if (this.d < 1) {
        this.ed = false;
      }
    }
  } // move function end

  // detects if hit box of player and enemy overlap
  collision() {
    if (this.x + this.w > player.x && this.x < player.x + player.w && this.y + this.h > player.y && this.y < player.y + player.h && invincibility == false) {
      player.dead();
    }
  } // collision function end
}