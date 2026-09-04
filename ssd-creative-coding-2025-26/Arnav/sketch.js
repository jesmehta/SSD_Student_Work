//Arrays to store stars,particles,variable to hold the font
let stars = [];
let font;
let particles = [];
// preload runs before setup - loads font before anything else
function preload() {
  font = loadFont("Orbitron-VariableFont_wght.ttf");
}
// Blueprint for each star particle
class Particle {
  // Each particle receives a target point from the letter outline
  constructor(pt) {
    this.targetX = pt.x; // where this particle needs to go (x)
    this.targetY = pt.y; // where this particle needs to go (y)
    this.x = random(width); // start at random position
    this.y = random(height);
    this.vx = 0; // velocity starts at 0, only moves on click
    this.vy = 0;
    this.size = random(4, 10); // velocity starts at 0
  }
  // runs every frame - handles movement logic
  update() {
    let dx = this.x - mouseX;
    let dy = this.y - mouseY;
    if (dx * dx + dy * dy < 1600) {
      // 40² = 1600
      // distance from mouse
      let angle = atan2(dy, dx); // reuse dx/dy — no recalculation // angle away from mouse
      this.x += cos(angle) * 3; // push 3px in that direction
      this.y += sin(angle) * 3;
    } else {
      // lerp toward target - moves 10% closer each frame
      let dx = this.targetX - this.x;
      let dy = this.targetY - this.y;
      this.x += dx * 0.1;
      this.y += dy * 0.1;

      this.x += this.vx; // apply explosion velocity
      this.y += this.vy;

      this.vx *= 0.9; // friction - velocity fades out over time
      this.vy *= 0.9;
    }
  }

  // runs every frame - handles drawing
  display() {
    this.size = 10 + sin(frameCount * 0.04) * 4; // breathing - size pulses with sin wave

    noStroke();
    fill(255, 215, 0, random(150, 255)); // gold color, random opacity = twinkle
    ellipse(this.x, this.y, this.size * 2, this.size * 2); // glow
  }
}

function setup() {
  createCanvas(800, 400);
  frameRate(120);
  // create 200 background stars - static, never move
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.5, 2),
      brightness: random(100, 200),
    });
  }

  // sample points along letter outlines of ARNAV using loaded font
  let points = font.textToPoints("A R N A V", 20, 240, 115, {
    sampleFactor: 0.5,
  });

  // create one particle per point - each gets a letter position as target
  for (let i = 0; i < points.length; i++) {
    particles.push(new Particle(points[i]));
  }
}

function draw() {
  //runs evvery frame
  background(13, 10, 7, 25); // creates motion trails
  for (let s of stars) {
    noStroke();
    fill(255, 240, 180, s.brightness);
    ellipse(s.x, s.y, s.size, s.size);
  }
  for (let p of particles) {
    p.update();
    p.display();
  }
  //draws lines between ech of nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[j].x - particles[i].x;
      let dy = particles[j].y - particles[i].y;
      if (dx * dx + dy * dy < 225) {
        // 15² = 225
        //connect only of particles are within 15px
        stroke(138, 90, 26, 150);
        strokeWeight(0.4);
        line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
      }
    }
  }
}
//fires once per click-gives every particle a random velocity
function mousePressed() {
  for (let p of particles) {
    p.vx = random(-10, 10);
    p.vy = random(-10, 10);
  }
}
