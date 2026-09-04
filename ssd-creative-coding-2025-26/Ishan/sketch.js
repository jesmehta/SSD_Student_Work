let target;
let score = 0;
let timeLeft = 40;
let startTime;
let gameOver = false;

let hit = 0;
let difficulty = 1;

let bg;

function preload() {
  img = loadImage('texas02.png');
}

function setup() {
  createCanvas(800, 600);
  spawnTarget();
  startTime = millis();
}

function draw() {
  // background
  image(img, 0, 0, width, height);

  // timer and its works
  timeLeft = 40 - floor((millis() - startTime) / 1000);
  if (timeLeft <= 0) gameOver = true;

  // incrrase in difficulty and definition 
  difficulty = 1 + (40 - timeLeft) * 0.05;

  // screen at end GAME OVER screen
  if (gameOver) {
    fill(10);
    textAlign(CENTER);
    textSize(30);
    text("Game Over", width / 2, height / 2);

    textSize(18);
    text("Score: " + score, width / 2, height / 2 + 40);
    text("Click to Restart", width / 2, height / 2 + 70);
    return;
  }

  // target is size reduced wrt respect to the difficulty
  let targetSize = 60 / difficulty;

  fill(200, 0, 0);
  noStroke();
  ellipse(target.x, target.y, targetSize);

  // crosshair display
  stroke(5);
  strokeWeight(2);

  let s = 12, g = 5;
// location of crosshair and mouse tracking 
  line(mouseX - s, mouseY, mouseX - g, mouseY);
  line(mouseX + g, mouseY, mouseX + s, mouseY);
  line(mouseX, mouseY - s, mouseX, mouseY - g);
  line(mouseX, mouseY + g, mouseX, mouseY + s);

  


  // UI score and time display
  noStroke();
  fill(255);
  textSize(16);
  text("Score: " + score, 10, 25);
  text("Time: " + timeLeft, 260, 25);
}

// SPAWN TARGET where the target spawns randomly and limit 
function spawnTarget() {
  target = {
    x: random(50, width - 50),
    y: random(80, height - 50)
  };
}

// when what happenes if mouse is pressed 
function mousePressed() {
  if (gameOver) {
    score = 0;
    startTime = millis();
    gameOver = false;
    spawnTarget();
    return;
  }
// checking distance between cursor and target and conditions if satisfied 
  let d = dist(mouseX, mouseY, target.x, target.y);
// follows if satisfied
  if (d < (20 / difficulty)) {
    score++;
    spawnTarget();
    hit = 8;
  }
}