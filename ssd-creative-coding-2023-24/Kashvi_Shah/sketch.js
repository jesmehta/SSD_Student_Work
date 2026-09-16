let bubbles = []; // Array to hold multiple Bubble objects

function setup() {
  createCanvas(400, 400);
  
  // Create 10 bubbles initially
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let radius = random(20, 50);
    let bubbleColor = color(random(255), random(200), random(250)); // Rename color to bubbleColor
    let xSpeed = random(-5, 5);
    let ySpeed = random(-5, 5);
    let shapeType = random() > 0.5 ? 'ellipse' : 'rect'; // Randomly choose shape
    
    bubbles.push(new Bubble(x, y, radius, bubbleColor, xSpeed, ySpeed, shapeType));
  }
  
  frameRate(30);
}

function draw() {
  background(220);
  
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

function mousePressed() {
  // Add a new bubble at the mouse position when mouse is clicked
  let x = mouseX;
  let y = mouseY;
  let radius = random(20, 50);
  let bubbleColor = color(random(255), random(200), random(250)); // Rename color to bubbleColor
  let xSpeed = random(-5, 5);
  let ySpeed = random(-5, 5);
  let shapeType = random() > 0.5 ? 'ellipse' : 'rect'; // Randomly choose shape
  
  bubbles.push(new Bubble(x, y, radius, bubbleColor, xSpeed, ySpeed, shapeType));
}

// function mouseClicked() {
//   // Check if mouse is clicked on any bubble and remove it
//   for (let i = bubbles.length - 1; i >= 0; i--) {
//     let bubble = bubbles[i];
//     let d = dist(mouseX, mouseY, bubble.x, bubble.y);
//     if (d < bubble.radius) {
//       bubbles.splice(i, 1); // Remove the bubble from the array
//     // }
//   }
// }

function mouseMoved() {
  // Change color of bubbles when mouse moves over them
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    let d = dist(mouseX, mouseY, bubble.x, bubble.y);
    if (d < bubble.radius) {
      bubble.bubbleColor = color(random(255), random(200), random(250)); // Change bubble color
    }
  }
}

class Bubble {
  constructor(x, y, radius, bubbleColor, xSpeed, ySpeed, shapeType) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.bubbleColor = bubbleColor; // Use bubbleColor instead of color
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.shapeType = shapeType;
  }
  
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    // Bounce off walls
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.xSpeed *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.ySpeed *= -1;
    }
  }
  
  show() {
    stroke(100);
    strokeWeight(3);
    fill(this.bubbleColor); // Use bubbleColor instead of color
    
    if (this.shapeType === 'ellipse') {
      ellipse(this.x, this.y, this.radius * 2);
    } else if (this.shapeType === 'rect') {
      rectMode(CENTER);
      rect(this.x, this.y, this.radius * 2, this.radius * 2);
    }
  }
}
