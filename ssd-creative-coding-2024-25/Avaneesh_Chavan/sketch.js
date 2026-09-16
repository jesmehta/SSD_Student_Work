let r = 15, points = 0, timer = 5;
let ball, player, prevBall = null;
let trail = [], particles = [];
let nx = 0, ny = 0, nz = 0, t = 0.05, scl = 5;
let floatOffset = 0, faceType = 0;

function setup() {
  createCanvas(600, 400);
  ball = createVector(random(r, width - r), random(r, height - r));
  noStroke();
  textSize(20);
}

function draw() {
  drawBackground();

  // --- UI ---
  fill(0); textAlign(RIGHT, TOP); textStyle(BOLD);
  text("Score: " + points, width - 20, 20);

  textAlign(LEFT, TOP);
  text("HEALTH", 15, 20);

  let healthW = map(timer, 0, 10, 0, 200);
  fill(getHealthColor(timer));
  rect(15, 45, healthW, 20);

  textStyle(NORMAL);

  // --- Motion + Drawing ---
  player = createVector(mouseX, mouseY);
  drawMotionBlur();
  drawTrail();

  floatOffset += 0.05;
  let floatY = sin(floatOffset) * 5;

  drawGlow(ball.x, ball.y + floatY, r);
  fill("pink");
  ellipse(ball.x, ball.y + floatY, r * 2);
  drawFace(faceType, ball.x, ball.y + floatY, r);

  trail.push(createVector(ball.x, ball.y + floatY));
  if (trail.length > 20) trail.shift();

  particles.forEach(p => { p.update(); p.show(); });
  particles = particles.filter(p => !p.isDead());

  if (timer > 0 && points > 0) timer -= 2 / 60;

  if (timer < 0) {
    noLoop();
    textAlign(CENTER); textSize(50); fill(0);
    text("DEFEATED", width / 2, height / 2);
  }
}

function mousePressed() {
  let floatY = sin(floatOffset) * 5;
  if (dist(mouseX, mouseY, ball.x, ball.y + floatY) < r) {
    prevBall = ball.copy();
    for (let i = 0; i < 20; i++) particles.push(new Particle(ball.x, ball.y + floatY));

    r = random(10, 40);
    ball = createVector(random(r, width - r), random(r, height - r));
    points++; if (points > 1) timer += 0.2;
    trail = [];
    faceType = floor(random(5));
  }
}

function drawBackground() {
  background(220);
  for (let j = 0; j < height; j += scl) {
    for (let i = 0; i < width; i += scl) {
      let ns = noise(nx, ny, nz);
      fill(ns * 200 + 55, ns * 40, ns * 200 + 55);
      rect(i, j, scl, scl);
      nx += t;
    }
    ny += t; nx = 0;
  }
  ny = 0; nx = 0; nz += t / 5;
}

function drawMotionBlur() {
  if (!prevBall) return;
  for (let i = 0; i <= 1; i += 0.05) {
    let x = lerp(prevBall.x, ball.x, i);
    let y = lerp(prevBall.y, ball.y, i);
    fill(255, 192, 203, 80); ellipse(x, y, 8);
  }
}

function drawTrail() {
  for (let p of trail) {
    fill(255, 192, 203, 150);
    ellipse(p.x, p.y, 6);
  }
}

function drawGlow(x, y, r) {
  for (let i = 20; i > 0; i--) {
    fill(255, 192, 203, 5);
    ellipse(x, y, r * 2 + i);
  }
}

function getHealthColor(t) {
  return t > 6.5 ? color(0, 200, 0) :
         t > 3.5 ? color(255, 215, 0) :
                   color(255, 0, 0);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.acc = createVector(0, 0.1);
    this.lifetime = 255;
    let ns = noise(x * 0.005, y * 0.005, nz);
    this.r = ns * 200 + 55;
    this.g = ns * 40;
    this.b = ns * 200 + 55;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifetime -= 4;
  }

  show() {
    fill(this.r, this.g, this.b, this.lifetime);
    ellipse(this.pos.x, this.pos.y, 6);
  }

  isDead() {
    return this.lifetime < 0;
  }
}

function drawFace(type, x, y, r) {
  push(); translate(x, y);
  fill(0);
  let eyeX = r / 3, eyeY = -r / 3;
  ellipse(-eyeX, eyeY, 5); ellipse(eyeX, eyeY, 5);
  stroke(0); strokeWeight(2); noFill();

  switch (type) {
    case 0: arc(0, r / 5, r * 1.5, r / 3, 0, PI); break; // happy
    case 1: line(-r / 4, r / 5, r / 4, r / 5); break;    // neutral
    case 2: ellipse(0, r / 5, r / 4, r / 4); break;      // surprised
    case 3: // angry
      line(-eyeX - 3, eyeY - 5, -eyeX + 3, eyeY - 1);
      line(eyeX - 3, eyeY - 1, eyeX + 3, eyeY - 5);
      line(-r / 4, r / 5, r / 4, r / 5);
      break;
    case 4: // cool
      fill(0);
      rect(-eyeX, eyeY, 10, 6); rect(eyeX, eyeY, 10, 6);
      line(-eyeX + 5, eyeY + 3, eyeX - 5, eyeY + 3);
      arc(0, r / 5, r * 1.5, r / 3, 0, PI);
      break;
  }
  pop();
}
