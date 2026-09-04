let ball;
let drag = true;
let mousepos;
let rdmposx;
let rdmposy;
let score = 0;

let spawnX = 30;
let spawnY;

function setup() {
  createCanvas(700, 400);

  ball = {};
  ball.x = 30;
  ball.y = height - 30;
  ball.r = 40;
  ball.vx = 0;
  ball.vy = 0;

  mousepos = createVector(mouseX, mouseY);

  rdmposx = random(520, 670);
  rdmposy = random(20, 380);

  spawnY = height - 30;
}

function draw() {
  background(220);

  if (!drag) {
    ball.x += ball.vx;
    ball.y += ball.vy;

    ball.vx *= 1;
    ball.vy += 0.5;

    // keeping the balls in the walls #freaky
    if (ball.y >= height - ball.r / 2) {
      ball.y = height - ball.r / 2;
      ball.vy *= -0.4;
    }
    if (ball.y <= ball.r / 2) {
      ball.y = ball.r / 2;
      ball.vy *= -0.4;
    }
    if (ball.x <= ball.r / 2) {
      ball.x = ball.r / 2;
      ball.vx *= -0.4;
    }
    if (ball.x >= width - ball.r / 2) {
      ball.x = width - ball.r / 2;
      ball.vx *= -0.4;
    }

    // when orange one touches black one, orange one dies and respawns (no racist connotation here)
    let d = dist(ball.x, ball.y, rdmposx, rdmposy);

    if (d < ball.r / 2 + 45) {
      score++;

      ball.x = spawnX;
      ball.y = spawnY;
      ball.vx = 0;
      ball.vy = 0;

      rdmposx = random(520, 670);
      rdmposy = random(20, 380);
    }
  }

  // draw the orange one (hates black ones)
  noStroke();
  fill("rgb(253,115,7)");
  ellipse(ball.x, ball.y, ball.r);

  // draw the black one
  fill("black");
  ellipse(rdmposx, rdmposy, 90, 90);

  // display amount of victims of the black one
  fill(0);
  textSize(20);
  text("score: " + score, 10, 25);
}

function mousePressed() {
  let d = dist(ball.x, ball.y, mouseX, mouseY);
  if (d < ball.r) {
    drag = true;
    ball.vx = 0;
    ball.vy = 0;
  }
}

function mouseDragged() {
  if (drag) {
    ball.x = mouseX;
    ball.y = mouseY;

    let current = createVector(mouseX, mouseY);
    let velocity = p5.Vector.sub(current, mousepos);

    ball.vx = velocity.x;
    ball.vy = velocity.y + 1;

    mousepos = current;
  }
}

function mouseReleased() {
  drag = false;
}
