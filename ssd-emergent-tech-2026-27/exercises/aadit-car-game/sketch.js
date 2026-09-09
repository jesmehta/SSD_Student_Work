/* Converted from Aadit Vanjari's Processing sketch. Serial left/right input is mapped to Arrow keys. */
let playerX, playerY, playerBaseY, playerLane, targetPlayerX;
const playerWidth = 45, playerHeight = 70, laneCount = 7;
let laneWidth = 60, roadLeft, roadRight;
let verticalTime = 0, roadLineOffset = 0;
const verticalAmount = 25, verticalSpeed = .04, laneSnapSpeed = .15, roadLineSpeed = 8;
let gameOver = false, level = 1, carsPassed = 0, spawnTimer = 0;
let leftPressed = false, rightPressed = false, cars = [], backgroundColors = [];

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent("canvas-host");
  roadLeft = floor((width - laneWidth * laneCount) / 2);
  roadRight = floor(roadLeft + laneWidth * laneCount);
  backgroundColors = [color(80,170,80),color(70,150,200),color(130,80,180),color(220,140,60),color(60,150,120),color(180,80,100),color(70,100,180),color(150,120,60)];
  restartGame();
}

function draw() {
  background(backgroundColors[(level - 1) % backgroundColors.length]);
  if (!gameOver) {
    roadLineOffset = (roadLineOffset + roadLineSpeed) % 40;
  }
  drawRoad();
  if (!gameOver) {
    movePlayer();
    spawnTraffic();
    updateTraffic();
    drawPlayer();
  } else {
    drawTraffic();
    drawPlayer();
    drawGameOver();
  }
  fill(255); noStroke(); textAlign(LEFT, BASELINE); textSize(20);
  text(`Level: ${level}`, 20, 30);
  text(`Cars passed: ${carsPassed}`, 20, 55);
  text(`Lane: ${playerLane + 1}`, 20, 80);
}

function drawRoad() {
  fill(60); noStroke(); rect(roadLeft, 0, roadRight - roadLeft, height);
  stroke(255); strokeWeight(3);
  for (let i = 1; i < laneCount; i++) {
    const x = roadLeft + i * laneWidth;
    for (let y = roadLineOffset - 40; y < height; y += 40) line(x, y, x, y + 20);
  }
  stroke(255,220,0); strokeWeight(5);
  line(roadLeft,0,roadLeft,height); line(roadRight,0,roadRight,height);
}

function movePlayer() {
  verticalTime += verticalSpeed;
  playerY = playerBaseY + sin(verticalTime) * verticalAmount;
  playerX = lerp(playerX, targetPlayerX, laneSnapSpeed);
  if (abs(playerX - targetPlayerX) < .1) playerX = targetPlayerX;
}
function getLaneCenter(lane) { return roadLeft + lane * laneWidth + laneWidth / 2; }
function moveLeft() { if (!gameOver && playerLane > 0) targetPlayerX = getLaneCenter(--playerLane); }
function moveRight() { if (!gameOver && playerLane < laneCount - 1) targetPlayerX = getLaneCenter(++playerLane); }
function drawPlayer() { rectMode(CENTER); fill(50,120,255); noStroke(); rect(playerX,playerY,playerWidth,playerHeight,8); rectMode(CORNER); }

function spawnTraffic() {
  spawnTimer++;
  const spawnRate = max(25, 80 - (level - 1) * 8);
  if (spawnTimer >= spawnRate) {
    spawnTimer = 0;
    const lane = floor(random(laneCount));
    cars.push(new Car(getLaneCenter(lane), -60, random(3,6) + (level - 1) * .5));
  }
}
function updateTraffic() {
  for (let i = cars.length - 1; i >= 0; i--) {
    const car = cars[i]; car.update(); car.display();
    if (car.hitsPlayer()) { gameOver = true; return; }
    if (car.y > height + 100) {
      carsPassed++; cars.splice(i,1);
      level = max(level, floor(carsPassed / 5) + 1);
    }
  }
}
function drawTraffic() { cars.forEach(car => car.display()); }
function drawGameOver() {
  fill(0,180); noStroke(); rect(0,0,width,height);
  fill(255); textAlign(CENTER,CENTER); textSize(60); text("GAME OVER",width/2,height/2-60);
  textSize(26); text(`Level ${level}`,width/2,height/2);
  textSize(22); text(`Cars passed: ${carsPassed}`,width/2,height/2+40);
  textSize(20); text("Press ENTER to restart",width/2,height/2+90);
}
function restartGame() {
  gameOver = false; level = 1; carsPassed = 0; spawnTimer = 0; cars = [];
  playerLane = floor(laneCount / 2); playerX = getLaneCenter(playerLane); targetPlayerX = playerX;
  playerBaseY = height - 100; verticalTime = 0; playerY = playerBaseY; roadLineOffset = 0;
  leftPressed = false; rightPressed = false;
}
function keyPressed() {
  if (gameOver && (keyCode === ENTER || keyCode === RETURN)) { restartGame(); return false; }
  if (!gameOver && keyCode === LEFT_ARROW && !leftPressed) { leftPressed = true; moveLeft(); return false; }
  if (!gameOver && keyCode === RIGHT_ARROW && !rightPressed) { rightPressed = true; moveRight(); return false; }
}
function keyReleased() {
  if (keyCode === LEFT_ARROW) leftPressed = false;
  if (keyCode === RIGHT_ARROW) rightPressed = false;
  if ([LEFT_ARROW,RIGHT_ARROW].includes(keyCode)) return false;
}

class Car {
  constructor(x,y,speed) { this.x=x; this.y=y; this.speed=speed; this.w=45; this.h=70; }
  update() { this.y += this.speed; }
  display() { rectMode(CENTER); fill(220,50,50); noStroke(); rect(this.x,this.y,this.w,this.h,8); rectMode(CORNER); }
  hitsPlayer() { return abs(this.x-playerX)<(this.w+playerWidth)/2 && abs(this.y-playerY)<(this.h+playerHeight)/2; }
}
