let particles = [];

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {

  if (mouseIsPressed) {
    let particle = new Particle(mouseX, mouseY);
    particles.push(particle);
  }

  background(255);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    particles = [];
    background(255);
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2); 
    this.vy = random(-8, 8); 
    this.size = random(4, 12); 
    this.shape = random(['ellipse', 'rect']); 
    this.color = color(random(255), random(255), random(255));
    this.alpha = 255; 
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1; 
    this.color.setAlpha(this.alpha); 
  }

  show() {
    noStroke();
    fill(this.color);
    if (this.shape === 'ellipse') {
      ellipse(this.x, this.y, this.size);
    } else if (this.shape === 'rect') {
      rect(this.x, this.y, this.size, this.size);
    }
  }

  edges() {
    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.vy *= -0.8 - (this.size / 50); 
      this.y = height; 
    }
  }
}
