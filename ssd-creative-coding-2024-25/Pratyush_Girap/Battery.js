class Battery {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 15;
    this.h = 10;
  }

  show() {
    fill(200);
    rect(this.x, this.y, this.w, this.h);
    rect(this.x + 1, this.y - 4, 5, 4);
    rect(this.x + 9, this.y - 4, 5, 4);
  }

  clicked(mx, my) {
    return (
      mx >= this.x &&
      mx <= this.x + this.w &&
      my >= this.y &&
      my <= this.y + this.h
    );
  }

  respawn() {
    let newPos = random(batteryPositions);
    this.x = newPos.x;
    this.y = newPos.y;
  }
}
