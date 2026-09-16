let x, y;
let stepX, stepY;
let ballColor;

function setup() {
  createCanvas(400, 400);
  x = 40;
  y = 40;

  stepX = 7;
  stepY = 5;

  ballColor = color(random(265), random(250), random(225)); // Start with random color

  strokeWeight(8);
  stroke(220);
}

function draw() {
  background(40, 30, 0, 20); 

  x = x + stepX;
  y= y + stepY;

  // Bounce and change color
  if (x > width - 20 || x < 20) {
    stepX = -stepX;
    ballColor = color(random(255), random(255), random(255));
  }

  if (y > height - 20 || y < 20) {
    stepY = -stepY;
    ballColor = color(random(255), random(255), random(255));
  }

  fill(ballColor);
  ellipse(x, y, 40, 40);
    fill("blue");
   circle(mouseX, mouseY,25);
  
  
}
