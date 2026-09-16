let fishes = []; //array for the school of fishes
let shark = -200; //x coordinate of the shark, draws the shark outside canvas
let s; //start time
let font; // variable for font
let textPoints = []; //text point array
let r = [-1, 1]; //for assigning possitive or negative

function preload() {
  font = loadFont("Roboto-Thin.ttf"); //font loading
}

function setup() {
  createCanvas(400, 400);

  s = millis(); //setting time to millisecond

  for (let i = 0; i < 140; i++) {
    fishes.push(new Fish());
  }

  textPoints = font.textToPoints("U H - O H !", 17, height / 2 + 20, 80); //text to point prep
}

function draw() {
  background(0, 100, 200);
  let t = millis() - s; //current time-start time

  if (t > 4000 && t < 8000) {
    drawShark();
    shark = shark + 3;
  } //shark drawn

  for (let i = 0; i < fishes.length; i++) {
    if (t < 4000) {
      fishes[i].swim();
    } else if (t < 8000) {
      fishes[i].scatter(shark, height / 2);
    } else {
      fishes[i].moveToText(textPoints[i % textPoints.length]);
    }
    fishes[i].display();
  } //fish movement
}

class Fish {
  constructor() {
    this.x = random(-width, 0);
    this.y = random(height);
    this.speed = random(1, 2);
    this.size = random(6, 10);
    this.color = color(random(200, 255), random(150, 255), random(255));
  }

  swim() {
    this.x += this.speed;
    if (this.x > width + 20) {
      this.x = random(-100, -10);
      this.y = random(height);
    }
  }

  scatter(sx, sy) {
    let d = dist(this.x, this.y, sx, sy);
    if (d < 100) {
      this.x = this.x + 10;
      this.y = this.y + random(r) * 10;
    } else {
      this.swim();
    }
  }

  moveToText(pt) {
    let tx = pt.x;
    let ty = pt.y;
    this.x += (tx - this.x) * 0.05;
    this.y += (ty - this.y) * 0.05;
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size * 2, this.size);
    triangle(
      this.x - this.size,
      this.y,
      this.x - this.size - 10,
      this.y + this.size - 15,
      this.x - this.size - 10,
      this.y - this.size + 15
    );
    fill(255);
    circle(this.x + this.size / 3, this.y - 2, this.size / 3);
    fill(0);
    circle(this.x + this.size / 3, this.y - 2, this.size / 5);
  }
}
//fish creation

function drawShark() {
  fill(100);
  noStroke();
  ellipse(shark, height / 2, 160, 80);
  triangle(
    shark - 80,
    height / 2,
    shark - 100,
    height / 2 - 30,
    shark - 5 - 100,
    height / 2 + 30
  );
  fill(255);
  ellipse(shark + 50, height / 2 - 10, 10); 
  fill(0);
  ellipse(shark + 50, height / 2 - 10, 5);
}
//shark creation
