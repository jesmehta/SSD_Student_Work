let xPos = 100; 
let yPos = 100; 
const speed = 5; 
let bump;
let stars = [];

let ob1, ob2, ob3; 
let gameOver = false; //end the game and stop the game

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
  stars.push({  //new object for star loop
    x: random(width),
    y: random(height),
    r: random(1, 3)
  });
}
  rectMode(CENTER);
  soundFormats("mp3");
  bump = loadSound("Game Over Sound Effect.mp3");

  ob1 = new Bouncer(width / 2, height / 2, 2, 3, 40, 40); //center and fixed speed
  ob2 = new Bouncer(
    random(width),
    random(height),
    random(1, 5),
    random(1, 5),
    40,
    40
  ); //random spot and speed
  ob3 = new Bouncer(width,height, 5, 5, 40, 40); //bottom-right corner, moves diagonally.
}

function draw() {
   background(0);
  noStroke();
fill(255);
for (let s of stars) {
  circle(s.x, s.y, s.r);
}
  if (gameOver) {
   fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over!", width/2, height/2 );
    return; 
  } //'GameOver' and stop the game

  ob1.update();
  ob1.display();
  ob2.update();
  ob2.display();
  ob3.update();
  ob3.display();

  handlePlayerMovement();

  fill(234, 162, 250);
  rect(xPos, yPos, 15, 15);

  if (checkCollision(ob1) || checkCollision(ob2) || checkCollision(ob3)) {
     if (!gameOver) bump.play();  // play once
    gameOver = true; //If yes, it ends the game.
  }
}
//Moves the player using arrow keys.
function handlePlayerMovement() {
  if (keyIsDown(LEFT_ARROW) && xPos > 10) xPos -= speed;
  if (keyIsDown(RIGHT_ARROW) && xPos < width - 10) xPos += speed;
  if (keyIsDown(UP_ARROW) && yPos > 10) yPos -= speed;
  if (keyIsDown(DOWN_ARROW) && yPos < height - 10) yPos += speed;
}
//Keeps the player inside the screen boundaries

function checkCollision(bouncer) {
  let dx = abs(xPos - bouncer.x); 
  let dy = abs(yPos - bouncer.y);
  let combinedHalfWidths = (20 + bouncer.w) / 2;
  let combinedHalfHeights = (20 + bouncer.h) / 2;
  return dx < combinedHalfWidths && dy < combinedHalfHeights;
}
//combinedHalfWidths- to check whether the two rectangles are overlapping on the x-axis

class Bouncer {
  constructor(x, y, stepX, stepY, w, h) {
    this.x = x;
    this.y = y;
    this.stepX = stepX / 2;
    this.stepY = stepY / 2;
    this.w=w;
    this.h=h;
    this.shapeType = "circle"; //it will start from circle
  }

  display() {
  push();
  translate(this.x, this.y);
  fill(93, 128, 95);

  if (this.shapeType === "circle") { //=== strict equality
    circle(0, 0, 50);
  } else if (this.shapeType === "square") {
    rectMode(CENTER);
    rect(0, 0, 40, 40);
  } else if (this.shapeType === "triangle") {
    triangle(-20, 20, 20, 20, 0, -20);
  }
  pop();
}

//Moves the obstacle and makes it bounce off walls.
  update() {
    this.x += this.stepX;
    this.y += this.stepY;
    this.bounce();
  }
//Makes the obstacle "bounce" off canvas edges by reversing direction.
  bounce() {
  let bounced = false;

  if (this.x > width || this.x < 0) {
    this.stepX *= -1;
    bounced = true;
  }
  if (this.y > height || this.y < 0) {
    this.stepY *= -1;
    bounced = true;
  }

  if (bounced) {
    // Increase speed by 5%
    this.stepX *= 1.05;
    this.stepY *= 1.05;

    // Optional: Limit max speed so it doesn't get too fast
    this.stepX = constrain(this.stepX, -10, 10);
    this.stepY = constrain(this.stepY, -10, 10);
    
     const shapes = ["circle", "square", "triangle"];
    this.shapeType = random(shapes);
  }
}
}