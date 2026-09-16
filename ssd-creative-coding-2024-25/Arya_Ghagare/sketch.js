let bird;
let gravity = 0.6;
let lift = -15;
let velocity = 0;
let pipes = [];
let clouds = [];
let score = 0;
let gameOver = false;
let bump;
let birdColor;
let particles = [];
let exploded = false;

function setup() {
  soundFormats("mp3");
  bump = loadSound("duckie.mp3")
  createCanvas(800, 400);
  userStartAudio(); // Unlock audio on user interaction
  bird = createVector(50, height / 2);
  birdColor = color(random(255), random(255), random(255));
  pipes.push(new Pipe());
  fullscreen();
  for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud());
  }
}

function draw() {
  background("pink");

  if (gameOver) {
    if (!exploded) {
      for (let i = 0; i < 3000; i++) {
        particles.push(new Particle(bird.x, bird.y));
      }
      exploded = true;
    }

    background("black");

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].isDead()) {
        particles.splice(i, 1);
      }
    }

    fill('white');
    textSize(64);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    showScore();
    noLoop();
    return;
  }

  // Draw clouds
  clouds.forEach((cloud, index) => {
    cloud.show();
    cloud.update();
    if (cloud.offscreen()) {
      clouds.splice(index, 1, new Cloud(true));
    }
  });

  // Draw pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      gameOver = true;
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      score++;
    }
  }
// Draw bird
  bird.y += velocity;
  velocity += gravity;
  velocity *= 0.9;

  
  fill(birdColor);
  ellipse(bird.x, bird.y, 60, 60);

  // Beak
  fill('orange');
  triangle(bird.x + 20, bird.y - 10, bird.x + 50, bird.y, bird.x + 30, bird.y + 10);

  // Eye
  stroke(200);
  fill('white');
  ellipse(bird.x + 20, bird.y - 10, 20, 20);

  // Pupil
  let pupilY = bird.y - 10 + constrain(velocity, -5, 5);
  fill('black');
  ellipse(bird.x + 20, pupilY, 10, 10);

  // Add new pipes
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }

  showScore();
}

function keyPressed() {
  if (key == " ") {
    velocity += lift;
    birdColor = color(random(255), random(255), random(255)); // Change color on jump
    if (bump && bump.isLoaded()) {
      bump.play();
    }
  }
}

function showScore() {
  fill('white');
  textSize(20);
  text("Score: " + score, 10, 30);
}

class Pipe {
  constructor() {
    this.top = random(height / 2);
    this.bottom = this.top + random(125, 200);
    this.x = width;
    this.w = 45;
    this.speed = 2 + frameCount / 1000;
  }

  show() {
    stroke('lightbrown');
    fill('brown');
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
    noStroke();
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }

  hits(object) {
    if (object.y < this.top || object.y > this.bottom) {
      if (object.x > this.x && object.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }
}

class Cloud {
  constructor(offscreen = false) {
    this.x = offscreen ? width + 100 : random(width);
    this.y = random(height / 3);
    this.size = random(50, 100);
    this.transparency = random(50, 200);
  }

  show() {
    noStroke();
    fill(255, 255, 255, this.transparency);
    ellipse(this.x, this.y, this.size, this.size / 2);
  }

  update() {
    this.x -= 1;
  }

  offscreen() {
    return this.x < -this.size;
  }
}

class Particle {
  constructor(x, y) {
   this.pos = createVector(x, y);
  this.vel = p5.Vector.random2D().mult(random(3, 20)); // BIG speed
  this.lifetime = 255;
  this.size = random(10, 25); // BIGGER particles
  this.color = color(random(255), random(255), random(255)); // Colorful explosion
}

  update() {
    this.pos.add(this.vel);
    this.lifetime -= 5;
  }

  show() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifetime);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.lifetime < 0;
  }
}


