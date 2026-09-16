let bullets = [];
let angle = 0;
let backgroundImage; 
let laserSound; 
let flashAlpha = 0; 

function preload() {
  backgroundImage = loadImage('main-qimg-2923dd2eeae5c94bda4cdfd85996f9c5-lq.jpg'); 
  laserSound = loadSound('iron-man-repulsor-157371.mp3');
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  noStroke();
}

function draw() {
  
  image(backgroundImage, 0, 0, width, height);
  
  
  if (flashAlpha > 0) {
    fill(255, flashAlpha);
    rect(0, 0, width, height); 
    flashAlpha -= 70; 
  }
  
 
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].display();
    if (bullets[i].isFinished()) {
      bullets.splice(i, 1);
    }
  }
}

function mouseClicked() {
  let velocityX = cos(angle);
  let velocityY = sin(angle);
  bullets.push(new Bullet(width / 3.2, height / 2, velocityX * 13, velocityY * 13));
  laserSound.play();
  
  flashAlpha = 100; 
}

function mouseMoved() {
  let dx = mouseX - width / 2;
  let dy = mouseY - height / 2;
  angle = atan2(dy, dx);
}

class Bullet {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 18; 
    this.lifetime = 20; 
    this.trail = []; 
    this.trailLength = 7; 
  }

  update() {
    this.trail.push(createVector(this.x, this.y));
    if (this.trail.length > this.trailLength) {
      this.trail.shift(); 
    }
    this.x += this.vx;
    this.y += this.vy;
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.vx *= -4;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.vy *= -4;
    }
    this.lifetime--; 
  }

  display() {
    for (let i = 0; i < this.trail.length; i++) {
      let trailAlpha = map(i, 0, this.trail.length, 250, 0); 
      fill(220, 40, 200, trailAlpha);
      ellipse(this.trail[i].x, this.trail[i].y, this.radius * 2);
    }
    fill(255, 0, 255);
    ellipse(this.x, this.y, this.radius * 2);
  }

  isFinished() {
    return this.lifetime <= 0;
  }
}
