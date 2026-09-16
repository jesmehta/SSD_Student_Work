let particles = [];
let bgColor;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  colorMode(HSB);
  bgColor = color(random(360), 100, 100);
}

function draw() {
  background(bgColor);
  particles.forEach((particle) => {
    particle.update();
    particle.display();
  });
}

function mouseClicked() {
  let index = floor(random(particles.length));
  particles[index].changeShape();
  particles[index].changeSize();
  particles[index].changeColor();
  changeBackgroundColor();
  // Move the clicked particle to the end of the array
  let clickedParticle = particles.splice(index, 1)[0];
  particles.push(clickedParticle);
}

function changeBackgroundColor() {
  bgColor = color(random(360), 100, 100);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.stepX = random(2, 5);
    this.stepY = random(2, 5);
    this.c = random(360);
    this.size = random(10, 40);
    this.shape = "ellipse";
  }

  update() {
    this.x = this.x + this.stepX;
    this.y = this.y + this.stepY;

    if (this.x < 0 || this.x > width) {
      this.stepX = -this.stepX;
    }

    if (this.y < 0 || this.y > height) {
      this.stepY = -this.stepY;
    }
  }

  display() {
    fill(this.c, 100, 100);
    if (this.shape === "ellipse") {
      ellipse(this.x, this.y, this.size, this.size);
    } else if (this.shape === "rectangle") {
      rect(this.x, this.y, this.size, this.size);
    } else if (this.shape === "triangle") {
      triangle(
        this.x,
        this.y - this.size / 2,
        this.x + this.size / 2,
        this.y + this.size / 2,
        this.x - this.size / 2,
        this.y + this.size / 2
      );
    } else if (this.shape === "spiral") {
      this.drawSpiral();
    }
  }

  drawSpiral() {
    let angle = 0;
    let x, y;
    beginShape();
    for (let i = 0; i < 100; i++) {
      x = this.x + (cos(angle) * this.size * i) / 100;
      y = this.y + (sin(angle) * this.size * i) / 100;
      vertex(x, y);
      angle += TWO_PI / 20;
    }
    endShape();
  }

  changeShape() {
    const shapes = ["ellipse", "rectangle", "triangle", "spiral"];
    let index = shapes.indexOf(this.shape);
    index = (index + 1) % shapes.length;
    this.shape = shapes[index];
  }

  changeSize() {
    this.size = random(10, 40);
  }

  changeColor() {
    this.c = random(360);
  }
}
