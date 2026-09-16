let img;
let square;
let trail = [];
let gridSize = 20;
let cols, rows;
let direction;

function preload() {
  img = loadImage("wave.jpg");
}

function setup() {
  createCanvas(400, 400);
  gridSize = 20;
  img.loadPixels();
  cols = width / gridSize;
  rows = height / gridSize;
  // img.resize(cols,rows)
  frameRate(10);
  square = createVector(0, 0);
  direction = createVector(0, 0);
}

function draw() {
  //  background(0);
  drawTrail();
  updateSquare();
  drawCurrentSquare();
}

function updateSquare() {
  square.add(direction);
  square.x = constrain(square.x, 0, cols - 1);
  square.y = constrain(square.y, 0, rows - 1);
}

function drawTrail() {
  let x = square.x;
  let y = square.y;

  let sx = int(map(x, 0, cols, 0, img.width));
  let sy = int(map(y, 0, rows, 0, img.height));
  let sw = int(img.width / cols);
  let sh = int(img.height / rows);

  image(img, x * gridSize, y * gridSize, gridSize, gridSize, sx, sy, sw, sh);
}

function drawCurrentSquare() {
  // fill(255, 0, 0);
  // noStroke();
  // rect(square.x * gridSize, square.y * gridSize, gridSize, gridSize);
  textSize(gridSize * 0.8);
  textAlign(CENTER, CENTER);
  fill(255);
  text(
    "🖌️",
    square.x * gridSize + gridSize / 2,
    square.y * gridSize + gridSize / 2
  );
}

function keyPressed() {
  if (keyCode === UP_ARROW) direction.set(0, -1);
  else if (keyCode === DOWN_ARROW) direction.set(0, 1);
  else if (keyCode === LEFT_ARROW) direction.set(-1, 0);
  else if (keyCode === RIGHT_ARROW) direction.set(1, 0);
}