let particles = [];
let textPoints = [];
let img;

function preload() {
  img = loadImage("jiya name.jpg");
}

function setup() {
  createCanvas(400, 400);
  img.resize(400, 250);
  img.loadPixels();

  let ox = width / 2 - img.width / 2;
  let oy = height / 2 - img.height / 2;

  for (let x = 0; x < img.width; x += 6) {
    for (let y = 0; y < img.height; y += 6) {
      let i = (x + y * img.width) * 4;

      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
      // for colours

      let bright = (r + g + b) / 3;
      // calculates brightness

      if (bright > 200) {
        // detects light pixels
        textPoints.push(createVector(x + ox, y + oy));
      }
    }
  }

  for (let p of textPoints) {
    particles.push(new Particle(random(width), random(height), p));
    // creates particles with random start and text target
  }
}

function draw() {
  background(0, 0, 0, 40);

  let d = dist(mouseX, mouseY, width / 2, height / 2);

  for (let p of particles) {
    p.update(d);
    p.display();
  }
}

class Particle {
  constructor(x, y, target) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);

    this.home = createVector(x, y);
    this.target = target;

    this.size = random(2, 4);
  }

  update(d) {
    if (d < 150) {
      let f = p5.Vector.sub(this.target, this.pos);
      f.setMag(0.4);
      this.acc.add(f);
    } else {
      let f = p5.Vector.sub(this.home, this.pos);
      f.setMag(0.05);
      this.acc.add(f);
    }

    this.acc.add(p5.Vector.random2D().mult(0.03));

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.vel.mult(0.95);
    this.acc.mult(0);
  }

  display() {
    noStroke();

    fill(255, 180, 100, 40);
    ellipse(this.pos.x, this.pos.y, this.size * 3);

    fill(255, 220, 150);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
