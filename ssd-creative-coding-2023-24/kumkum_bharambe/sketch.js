let particles = [];
let isTriangle = false;
let isColorful = false;
let shapes = ['ellipse', 'triangle', 'rect', 'line'];
let gridSize = 60;

function setup() {
  createCanvas(600, 600);
  frameRate(122);
  colorMode(HSB);
}

function draw() {
  background(220);
  
  // Draw vertical lines
  for (let x = 0; x <= width; x += gridSize) {
    line(x, 0, x, height);
  }
  
  // Draw horizontal lines
  for (let y = 0; y <= height; y += gridSize) {
    line(0, y, width, y);
  }
  
  // Display particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

function mousePressed() {
  let newShape = random(shapes);
  let newParticle = new Particle(mouseX, mouseY, newShape);
  particles.push(newParticle);
}

class Particle {
  constructor(x, y, shape) {
    this.x = x;
    this.y = y;
    this.stepX = random(2, 5);
    this.stepY = random(2, 5);
    this.c = random(360);
    this.shape = shape;
    this.size = random(10, 40);
  }
  
  update() {
    this.x += this.stepX;
    this.y += this.stepY;
    
    if (this.x < 0 || this.x > width) {
      this.stepX = -this.stepX;
    }
    
    if (this.y < 0 || this.y > height) {
      this.stepY = -this.stepY;
    }
  }


    display() {
    noStroke(); // Remove stroke
    fill(this.c, 100, 100);
    fill(this.c, 100, 100);
    if (this.shape === 'ellipse') {
      ellipse(this.x, this.y, this.size, this.size);
    } else if (this.shape === 'triangle') {
      triangle(this.x, this.y - this.size / 2, this.x - this.size / 2, this.y + this.size / 2, this.x + this.size / 2, this.y + this.size / 2);
    } else if (this.shape === 'rect') {
      rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else if (this.shape === 'line') {
      line(this.x - this.size / 2, this.y - this.size / 2, this.x + this.size / 2, this.y + this.size / 2);
    }
  }
}
