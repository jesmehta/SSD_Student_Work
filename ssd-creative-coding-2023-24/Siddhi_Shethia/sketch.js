let objects = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 15; i++) {
    if (random(1) > 0.5) {
      objects.push(new Bunny(random(width), random(height)));
    } else {
      objects.push(new Particle(random(width), random(height)));
    }
  }
}
function draw() {
  background(255);
  for (let obj of objects) {
      obj.update();
      obj.display();
      obj.update();
      obj.display();
    }
}

function mouseClicked() {
  // Create a new bunny or particle at the mouse position
  let newObj;
  if (random(1) > 0.5) {
    newObj = new Bunny(mouseX, mouseY);
  } else {
    newObj = new Particle(mouseX, mouseY);
  }
  objects.push(newObj);
}

class Bunny {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
   // this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  display() {
    fill(this.color);

    // Bunny ears
    ellipse(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.3, this.size * 0.3);
    ellipse(this.x + this.size * 0.3, this.y - this.size * 0.3, this.size * 0.3, this.size * 0.3);

    // Bunny body
    ellipse(this.x, this.y, this.size, this.size * 0.7);

    // Bunny eyes
    fill(255,0,0);
    ellipse(this.x - this.size * 0.3, this.y - this.size * 0.1, this.size * 0.1);
    ellipse(this.x + this.size * 0.3, this.y - this.size * 0.1, this.size * 0.1);

    // Bunny nose
    fill(255, 100, 100);
    ellipse(this.x, this.y + this.size * 0.1, this.size * 0.10);
  }
  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 15);
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}