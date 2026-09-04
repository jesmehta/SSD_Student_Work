let p = [], i;
let catX = 1;
let catY = 1;
let lives = 5; //Number of chances before losing
let score = 0; // Number of mice caught
let img;
let gameover = false;
let bgMusic; // Background music
let timeLeft;

function preload() {
  img = loadImage("beige.jpeg");
  bgMusic = loadSound("gamesong.mp3");
}

function setup() {
  createCanvas(750, 750);
  bgMusic.loop(); // So that the song doesn't stop in the middle of gameplay

  for (
    let i = 0;
    i <10;
    i++ // Creating 10 mice
  ) {
    p[i] = new Particle();
  }
  angleMode(DEGREES); // Use degrees for rotation instead of   radians
}

function draw() {
  img.resize(750, 750);
  image(img, 0, 0); // Draw background

  // Win condition: all mice removed
  if (p.length <= 0) {
    gameover = true;
  }
  // Lose condition: no lives left
  if (lives <= 0) {
    gameover = true;
  }
  if (!gameover) {
    text("Chances: " + lives, 20, 90); // Display remaining lives

    for (let i = 0; i < p.length; i++) {
      p[i].update(); //Update position (movement)
      p[i].display(); //drawing mouse
    }
    // Updating cat position to follow mouse cursor
    catX = mouseX;
    catY = mouseY;
    drawKitty(catX, catY, 0.7); //drawing the cat at cursor/pointer

    fill(0);
    textSize(32);
    textFont("Courier");
    text("Score: " + score, 20, 50); // Display score
  }

  //GAME OVER SCREEN
  else {
    bgMusic.stop(); // Stop music when game ends

    textAlign(CENTER, CENTER);
    fill(0);

    textSize(60);

    if (p.length === 0) {
      text("YOU WIN!😼", width / 2, height / 2);
    } else {
      text("YOU LOSE 🐭", width / 2, height / 2);
    }
  }
}

class Particle {
  // defines each mouse object
  constructor() {
    // Initial position (center of canvas)
    this.x = width / 2;
    this.y = height / 2;
    // Random movement speed in x and y directions
    this.stepX = random(-10, 10);
    this.stepY = random(10, -10);
    this.size = random(-10, 7);
  }

  update() {
    this.x += this.stepX;
    this.y += this.stepY;

    if (this.x <= 0 || this.x >= width) {
      this.stepX = -this.stepX;
    }
    if (this.y <= 0 || this.y >= height) {
      this.stepY = -this.stepY;
    }
  }
  display() {
    drawMouse(this.x, this.y, this.size); // Draw mouse at its current position
  }
}
function drawMouse(x, y) {
  //tail
  line(50 + x, 3 + y, 75 + x, 3 + y);

  //mouse body
  push();
  fill("#693565");
  triangle(-10 + x, 8 + y, 20 + x, y - 5, 20 + x, 10 + y);
  ellipse(32 + x, 3 + y, 38, 17);

  //eyes
  fill("rgb(130,38,38)");
  ellipse(8 + x, 4 + y, 4, 3);

  //ears
  fill(92, 96, 110);
  ellipse(15 + x, y - 5, 8, 10);

  pop();
}

function drawKitty(x, y, s) {
  push(); // isolate kitty

  translate(x, y); // move origin to kitty center
  scale(0.4);
  rotate(-22.5);

  noStroke();

  // cat face
  fill(20, 200, 200);
  arc(0, 0, 240 + s, 240 + s, 0, 225, PIE, 5);
  triangle(0, 0, -85, -85, -60, -150);
  triangle(0, 0, 150, -65, 120, 0);

  // cat ear
  fill("rgb(204,81,81)");
  triangle(-35, -55, -85, -55, -60, -125);
  triangle(55, -15, 130, -45, 100, 20);

  // cat eyes
  fill("rgb(204,81,81)");
  ellipse(-45, -7, 35 + s, 35 + s);
  ellipse(35, 28, 35 + s, 35 + s);

  fill("rgb(143,154,54)");
  circle(35, 30, 25 + s);
  circle(-45, -5, 25 + s);

  fill("black");
  circle(35, 30, 20 + s);
  circle(-45, -5, 20 + s);

  //cat nose
  fill("rgb(204,81,81)");
  triangle(-30, 15, 11, 32, -20, 50);

  //cat mouth

  push();
  fill("rgb(204,81,81)");
  rotate(-67);

  rect(-80, -15, s - 15, s + 30, 10);
  fill("rgb(0,0,0)");
  rect(-52, 0, s - 28, s + 2, 5);
  pop();

  // whiskers
  push();
  fill("rgb(0,0,0)");
  rotate(-85);
  rect(-60, 25, s + 4, s + 90, 8);
  pop();

  push();
  fill("rgb(0,0,0)");
  rotate(-70);
  rect(-70, 35, s + 4, s + 95, 8);
  pop();

  push();
  fill("rgb(0,0,0)");
  rotate(-55);
  rect(-80, 45, s + 4, s + 90, 8);
  pop();

  // whiskers (right side)
  push();
  fill("rgb(0,0,0)");
  rotate(-55);
  rect(-65, -125, s + 4, s + 90, 8);
  pop();

  push();
  fill("rgb(0,0,0)");
  rotate(-75);
  rect(-85, -135, s + 4, s + 95, 8);
  pop();

  push();
  fill("rgb(0,0,0)");
  rotate(-65);
  rect(-75, -125, s + 4, s + 90, 8);
  pop();

  pop();
}

function mousePressed() {
  let hit = false; // track if a mouse is caught

  for (let i = p.length - 1; i >= 0; i--) {
    let d = dist(catX, catY, p[i].x, p[i].y);
    if (d < 40) {
      p.splice(i, 1); //particle disappears from the game and updates the array     without leaving empty values.
      score++;
      hit = true; // successful click
    }
  }

  if (!hit) {
    lives = lives - 1; // if u misclick, u will lose a life
  }
}
