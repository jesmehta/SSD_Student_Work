let distMouse = 15;
let cols; let rows; let size = 10; let offset = 4;
let blocks = [];

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  angleMode(DEGREES);
  cols = width / size;
  rows = height / size;

  for (let i = 0; i < cols; i++) {
    blocks[i] = [];
    for (let j = 0; j < rows; j++) {
      blocks[i][j] = new Block(size / 2 + i * size, size / 2 + j * size);
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      blocks[i][j].changeColor();
      blocks[i][j].rotateRandomly();
      blocks[i][j].pulse();
      blocks[i][j].moveInWave();
      blocks[i][j].moveRandomly();
      blocks[i][j].followMouse();
      blocks[i][j].changeOpacity();
      blocks[i][j].growNearMouse();  // New effect
      blocks[i][j].display();
    }
  }
}

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = color(255);
    this.angle = 0;
    this.size = size;
    this.opacity = 255;
  }

  changeColor() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    this.color = color(map(d, 0, width, 0, 255), 0, 255);
  }

  rotateRandomly() {
    this.angle += random(-1, 1);
  }

  pulse() {
    this.size = size + sin(frameCount * 0.1) * 5;
  }

  moveInWave() {
    this.y += sin(frameCount * 0.1 + (this.x + this.y) * 0.1) * 2;
  }

  moveRandomly() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  followMouse() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 100) {  // If the mouse is close enough
      let angle = atan2(mouseY - this.y, mouseX - this.x);
      this.x += cos(angle) * 0.5;  // Move towards the mouse
      this.y += sin(angle) * 0.5;
    }
  }

  changeOpacity() {
    this.opacity = map(sin(frameCount * 0.1), -1, 1, 50, 255);
  }

  growNearMouse() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    this.size = map(d, 0, 100, size * 1.5, size * 0.5);
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(red(this.color), green(this.color), blue(this.color), this.opacity);
    rect(0, 0, this.size - offset, this.size - offset);
    pop();
  }
}
