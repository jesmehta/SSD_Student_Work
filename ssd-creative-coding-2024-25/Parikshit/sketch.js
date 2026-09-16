let offset = 0;
let player;
let enemies = [];
let enemyTimer = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  player = new Car(width / 2 - 20, height - 100, color(255, 0, 0));
}

function draw() {
  if (gameOver) {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
    noLoop(); // stops the game
    return;
  }

  background(0);

  // ==== Road ====
  offset += 3;
  if (offset > 40) offset = 0;

  fill(50);
  noStroke();
  rect(50, 0, 300, height);

  stroke(255);
  strokeWeight(2);
  let lanes = [125, 200, 275];
  for (let x of lanes) {
    for (let y = -40; y < height; y += 40) {
      line(x, y + offset, x, y + 20 + offset);
    }
  }

  noStroke();
  fill(255, 0, 0);
  for (let y = -20; y < height; y += 20) rect(40, y + offset, 10, 10);
  for (let y = -10; y < height; y += 20) rect(350, y + offset, 10, 10);

  // ==== Player ====
  player.move();
  player.display();

  // ==== Enemies ====
  enemyTimer++;
  if (enemyTimer > 60) {
    let laneX = [70, 140, 210, 280];
    let x = random(laneX);
    let col = color(random(255), random(255), random(255));
    enemies.push(new Car(x, -100, col));
    enemyTimer = 0;
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].y += 4;
    enemies[i].display();

    // === Collision Check ===
    if (dist(player.x, player.y, enemies[i].x, enemies[i].y) < 50) {
      gameOver = true;
    }

    // remove off-screen
    if (enemies[i].y > height + 100) {
      enemies.splice(i, 1);
    }
  }
}

// ==== Car Class (for both player and enemies) ====
class Car {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.c = col;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;
    this.x = constrain(this.x, 60, width - 80);
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(0.7);
    rectMode(CENTER);

    fill(this.c);
    rect(38, 140, 35, 5); // rear wing
    fill(255, 204, 0);
    rect(38, 142, 15, 2); // wing stripe

    fill(60);
    rect(19, 117, 10, 20); // tires
    rect(57, 117, 10, 20);
    rect(19, 42, 10, 20);
    rect(57, 42, 10, 20);

    fill(this.c);
    beginShape(); // car body
    vertex(30, 140);
    vertex(46, 140);
    vertex(49, 125);
    vertex(50, 115);
    vertex(46, 100);
    vertex(44, 87);
    vertex(44, 62);
    vertex(45, 50);
    vertex(40, 35);
    vertex(35, 35);
    vertex(30, 50);
    vertex(31, 62);
    vertex(31, 87);
    vertex(29, 100);
    vertex(25, 115);
    vertex(26, 125);
    endShape(CLOSE);

    rect(25, 90, 4, 12); // side pods
    rect(55, 90, 4, 12);

    fill(30);
    rect(38, 78, 10, 12, 1); // cockpit
    fill(100, 180, 220);
    rect(38, 71, 9, 5, 1); // windshield

    fill(this.c);
    rect(38, 30, 28, 5); // front wing

    pop();
  }
}
