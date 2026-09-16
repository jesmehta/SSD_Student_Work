let particles = [];
let img;
let popSound;
//let flipStarted = false;

function preload() {
  img = loadImage("bird3.jpg");
  soundFormats("mp3", "wav");
  popSound = loadSound("Sound.mp3");
}

function setup() {
  createCanvas(600, 600);
  img.resize(width, 0);
  angleMode(DEGREES);

  for (let x = 0; x < img.width; x += 10) {
    for (let y = 0; y < img.height; y += 10) {
      let col = img.get(x, y);
      particles.push(new Particle(x, y, col));
    }
  }
}

function draw() {
  background(0);

  for (let p of particles) {
    p.update();
    p.show();
  }
}

function mousePressed() {
  flipStarted = true;
  if (popSound.isLoaded()) {
    popSound.play();
  }
  for (let p of particles) {
    p.startFlip();
  }
}

class Particle {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.angle = 0;
    this.flipping = false;
  }

  startFlip() {
    this.flipping = true;
    this.angle = 0;
  }

  update() {
    if (this.flipping) {
      this.angle += 20;
      if (this.angle >= 180) {
        this.angle = 180;
        this.flipping = false;
      }
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    if (this.angle < 90) {
      fill(this.col);
      triangle(0, 0, 9, 10, -9, 10);
    } else {
      fill(this.col);
      ellipse(0, 5, 12, 12);
    }

    pop();
  }
}
