
let fireworks = [];
let floatingTexts = [];
let sound;
let backgroundColor;
let videoCapture;
let mic;
let micLevelThreshold = 0.1; // Adjust as needed

function preload() {
  sound = loadSound("fireworks-29629.mp3");
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  backgroundColor = color(0); // Initial background color

  // Initialize video capture
  videoCapture = createCapture(VIDEO);
  videoCapture.size(320, 240);
  videoCapture.hide(); // Hide the video element

  // Initialize microphone
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(backgroundColor);

  // Draw video capture
  image(videoCapture, 0, 0, width, height);

  // Check microphone input level
  let micLevel = mic.getLevel();
  
  // Map micLevel to a suitable threshold based on your environment and microphone sensitivity
  let mappedThreshold = map(micLevel, 0, 1, 0, 1);
  
  // Check if micLevel exceeds the threshold
  if (mappedThreshold > micLevelThreshold) {
    // Trigger fireworks and haptic sound on microphone input
    triggerFireworks();
    sound.play();
  }

  fireworks.forEach(firework => {
    firework.update();
    firework.display();
  });
  fireworks = fireworks.filter(firework => !firework.isFinished());

  floatingTexts.forEach(text => {
    text.update();
    text.display();
  });
  floatingTexts = floatingTexts.filter(text => !text.isFinished());
}

function mouseClicked() {
  triggerFireworks();
  sound.play();
  floatingTexts.push(new FloatingText(mouseX, mouseY, "Happy New Year!", color(random(360), 255, 255)));
  
  changeBackgroundColor(); // Change background color dynamically
}

function triggerFireworks() {
  const numOfParticles = random(50, 10);
  const hue = random(360);
  const types = ['trail', 'colorChange', 'exploding', 'spiral', 'star'];
  const type = random(types);
  fireworks.push(new Firework(random(width), random(height), hue, numOfParticles, type));
}

// Function to change background color on mouse click
function changeBackgroundColor() {
  backgroundColor = color(random(255), random(255), random(255));
}

// Function to create a trail effect following mouse movement
function mouseMoved() {
  const numOfParticles = 5;
  const hue = random(360);
  fireworks.push(new Firework(mouseX, mouseY, hue, numOfParticles, 'trail'));
}

// Function to create a random explosion effect on the canvas
function createRandomExplosion() {
  const x = random(width);
  const y = random(height);
  const numOfParticles = random(50, 100);
  const hue = random(360);
  const type = 'exploding';
  fireworks.push(new Firework(x, y, hue, numOfParticles, type));
}

// Function to clear all fireworks and floating texts from the canvas
function clearCanvas() {
  fireworks = [];
  floatingTexts = [];
}

// Additional key press events for interactive features
function keyPressed() {
  if (key === 'e') {
    createRandomExplosion();
  } else if (key === 'c') {
    clearCanvas();
  }
}

// Function to toggle camera visibility
function toggleCamera() {
  if (videoCapture) {
    videoCapture.hide();
  } else {
    videoCapture.show();
  }
}

class Particle {
  constructor(x, y, hue, type) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 5));
    this.lifespan = 255;
    this.hue = hue;
    this.type = type;
    this.history = [];
    this.angle = 0;
    this.exploded = false;
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan -= 2;

    if (this.type === 'trail') {
      this.history.push(createVector(this.pos.x, this.pos.y));
      if (this.history.length > 10) {
        this.history.shift();
      }
    } else if (this.type === 'colorChange') {
      this.hue = (this.hue + 1) % 360;
    } else if (this.type === 'exploding' && !this.exploded && this.lifespan < 128) {
      this.exploded = true;
      for (let i = 0; i < 10; i++) {
        const newParticle = new Particle(this.pos.x, this.pos.y, this.hue, 'trail');
        newParticle.vel = p5.Vector.random2D().mult(random(1, 3));
        fireworks.push(newParticle);
      }
    } else if (this.type === 'spiral') {
      this.angle += 0.1;
      this.vel.x = cos(this.angle) * 2;
      this.vel.y = sin(this.angle) * 2;
    }
  }

  display() {
    if (this.type === 'trail') {
      noFill();
      beginShape();
      this.history.forEach(pos => {
        stroke(this.hue, 255, 255, this.lifespan);
        vertex(pos.x, pos.y);
      });
      endShape();
    } else if (this.type === 'star') {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      stroke(this.hue, 255, 255, this.lifespan);
      strokeWeight(2);
      noFill();
      beginShape();
      for (let i = 0; i < 5; i++) {
        line(0, 0, 10, 10);
        rotate(TWO_PI / 5);
      }
      endShape(CLOSE);
      pop();
    } else {
      stroke(this.hue, 255, 255, this.lifespan);
      strokeWeight(4);
      point(this.pos.x, this.pos.y);
    }
  }

  isFinished() {
    return this.lifespan <= 0;
  }
}

class Firework {
  constructor(x, y, hue, numOfParticles, type) {
    this.particles = Array.from({ length: numOfParticles }, () => new Particle(x, y, hue, type));
  }

  update() {
    this.particles.forEach(particle => particle.update());
  }

  display() {
    this.particles.forEach(particle => particle.display());
  }

  isFinished() {
    return this.particles.every(particle => particle.isFinished());
  }
}

class FloatingText {
  constructor(x, y, text, color) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, -3));
    this.lifespan = 255;
    this.text = text;
    this.color = color;
    this.size = random(20, 32);
    this.rotation = random(-PI / 16, PI / 16);
    this.bounce = false;
    this.bounceDirection = 1;
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan -= 2;
    if (this.bounce) {
      this.pos.y += sin(frameCount * 0.1) * 2 * this.bounceDirection;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rotation);
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    noStroke();
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.text, 0, 0);
    pop();
  }

  isFinished() {
    return this.lifespan <= 0;
  }
}
