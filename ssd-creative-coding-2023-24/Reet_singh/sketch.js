class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 50);
    this.color = color(random(255), 100, 100, 0.5);
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
    rect(this.y, this.x, this.size, this.size);
    
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }
}

let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  let r = map(mouseX, 0, width, 0, 255);
  let g = map(mouseY, 0, height, 0, 255);
  let b = map(mouseX, 0, width, 255, 0);

  background(r, g, b);

  for (let bubble of bubbles) {
    bubble.display();
    bubble.update();
  }
}

function mousePressed() {
  let bubble = new Bubble(mouseX, mouseY);
  bubbles.push(bubble);
}
