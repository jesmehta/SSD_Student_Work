let video,
  handpose,
  predictions = []; //cam n tracking wala results
let fruits = [],
  particles = [],
  trail = []; //game objects
let score = 0,
  combo = 0; // scoring system
let lastX = 0,
  lastY = 0,
  speed = 0; //hand movement tracking
let difficulty = 1,
  gameState = "start"; //game control
let shake = 0,
  osc; //effects n sound

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); //camera setup

  handpose = ml5.handpose(video, () => console.log("Handpose ready!")); //hand pose model
  handpose.on("predict", (r) => (predictions = r)); //hand data

  osc = new p5.Oscillator("triangle");
  osc.start();
  osc.amp(0); // sound setup research kiya ye p5
  initFruits(); //create fruits
}

function draw() {
  background(12, 12, 22);

  if (shake > 0) {
    translate(random(-shake, shake), random(-shake, shake));
    shake *= 0.9;
  } //screen shake for ur better reponse

  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop(); //mirror camera

  if (gameState === "start") return drawStart(); //start screen
  if (gameState === "over") return drawGameOver(); //game over screen

  difficulty += 0.001; // increase speed over time

  fruits.forEach((f) => {
    f.update();
    f.show();
  }); //update fruits

  for (let i = particles.length - 1; i >= 0; i--) {
    //particle loop
    let p = particles[i];
    p.update();
    p.show();
    if (p.life <= 0) particles.splice(i, 1); //remove dead particles
  }

  if (predictions.length) {
    //hand detect hoyega
    let [x, y] = [
      width - predictions[0].landmarks[8][0],
      predictions[0].landmarks[8][1],
    ]; //index tip

    speed = dist(x, y, lastX, lastY);
    lastX = x;
    lastY = y; //calcuspeed

    trail.push(createVector(x, y));
    if (trail.length > 18) trail.shift(); //store movement

    noFill();
    for (let i = 0; i < trail.length - 1; i++) {
      //draw trail
      stroke(120, 180, 255, map(i, 0, trail.length, 50, 200));
      strokeWeight(map(i, 0, trail.length, 1, 5));
      line(trail[i].x, trail[i].y, trail[i + 1].x, trail[i + 1].y); //talwalll e
    }

    if (speed > 8) {
      //slice only if fast movement
      fruits.forEach((f) => {
        if (!f.sliced && dist(x, y, f.x, f.y) < f.r) {
          //collision check
          f.sliced = true;

          if (f.type === "bomb") {
            shake = 15;
            gameState = "over";
          } //bomb = end game
          else {
            let pts = floor(map(speed, 8, 40, 1, 6)); //speed based points
            score += pts * (1 + combo);
            combo++; //combo scoring

            shake = 8;
            playSliceSound(speed); //effects

            for (let i = 0; i < 10; i++)
              particles.push(new Particle(f.x, f.y, f.col)); //particles
          }
        }
      });
    }
  } else combo = max(0, combo - 1); //no hand = reduce combo

  drawUI(); //draw score UI
}

function playSliceSound(s) {
  //sound
  osc.freq(map(s, 8, 40, 200, 800));
  osc.amp(0.3, 0.05);
  osc.amp(0, 0.2);
}

function drawUI() {
  noStroke();
  fill(20, 20, 30, 170);
  rect(15, 15, 220, 110, 14); //panel
  stroke(255, 30);
  noFill();
  rect(15, 15, 220, 110, 14); //border

  noStroke();
  textAlign(LEFT, CENTER);

  fill(180);
  textSize(14);
  text("SCORE", 30, 40);
  fill(255);
  textSize(30);
  text(score.toLocaleString(), 30, 65);

  fill(160);
  textSize(12);
  text("COMBO", 30, 95);
  fill(200);
  textSize(20);
  text("x" + combo, 110, 95);
  let bar = constrain(map(speed, 0, 40, 0, 120), 0, 120);

  fill(60);
  rect(30, 105, 120, 6, 3);
  fill(120, 180, 255);
  rect(30, 105, bar, 6, 3);
}

function drawStart() {
  fill(0, 180);
  rect(0, 0, width, height); // overlay
  textAlign(CENTER, CENTER);

  fill(220);
  textSize(34);
  text("Khalsa Fruit Center", width / 2, height / 2 - 40);
  fill(150);
  textSize(16);
  text("Gesture Controlled Game", width / 2, height / 2);

  fill(120, 180, 255);
  rect(width / 2 - 70, height / 2 + 30, 140, 40, 10);
  fill(0);
  text("Start", width / 2, height / 2 + 50);
}

function drawGameOver() {
  fill(0, 180);
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);

  fill(255, 100, 100);
  textSize(34);
  text("Game Over", width / 2, height / 2 - 40);
  fill(220);
  textSize(18);
  text("Score: " + score.toLocaleString(), width / 2, height / 2);

  fill(120, 180, 255);
  rect(width / 2 - 70, height / 2 + 30, 140, 40, 10);
  fill(0);
  text("Restart", width / 2, height / 2 + 50);
}

function mousePressed() {
  userStartAudio(); // enable sound
  if (gameState === "start") gameState = "play";
  else if (gameState === "over") restartGame();
}

function restartGame() {
  score = 0;
  combo = 0;
  difficulty = 1;
  particles = [];
  trail = []; //reset values
  initFruits();
  gameState = "play";
}

function initFruits() {
  fruits = [];
  for (let i = 0; i < 6; i++) fruits.push(new Fruit()); //fruits
}
class Fruit {
  constructor() {
    this.r = random(25, 40);
    this.speed = random(3, 6);
    this.angle = random(TWO_PI);
    this.spin = random(-0.05, 0.05);
    this.reset();
  }

  update() {
    this.y -= this.speed * difficulty;
    this.angle += this.spin;
    if (this.y < -50) this.reset();
  } //movement

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    if (this.type === "bomb") {
      fill(60);
      ellipse(0, 0, this.r * 2);
      fill(255, 80, 80);
      textAlign(CENTER, CENTER);
      text("💣", 0, 0);
    } else if (!this.sliced) {
      fill(this.col);
      ellipse(0, 0, this.r * 2);
      fill(255, 120);
      ellipse(-this.r * 0.3, -this.r * 0.3, this.r * 0.6);
    } else {
      fill(this.col);
      ellipse(-this.r * 0.5, 0, this.r * 1.2);
      ellipse(this.r * 0.5, 0, this.r * 1.2);
    }

    pop();
  }

  reset() {
    this.x = random(width);
    this.y = height + random(100);
    this.sliced = false;
    this.type = random() < 0.2 ? "bomb" : "fruit";
    this.col = color(random(150, 255), random(100, 200), random(100, 200));
  }
}

class Particle {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 4));
    this.life = 40;
    this.col = col;
  }
  update() {
    this.pos.add(this.vel);
    this.life--;
  } //movement
  show() {
    noStroke();
    fill(red(this.col), green(this.col), blue(this.col), this.life * 6);
    ellipse(this.pos.x, this.pos.y, 4);
    frameRate(30);
  }
}
