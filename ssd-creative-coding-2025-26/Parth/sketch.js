let car = 0;
let particles = []; // so as to make an array
const numParticles = 5000;
let roadImg;
let carX =0;

function preload(){
   roadImg = loadImage('Road.jpg'); //helps load the image before anything else takes place
}
function setup() {
  createCanvas(1200, 400);
  noStroke();
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle()); //this increases the no.of particles till the limit before moving to+ the draw function
  }
}

function draw() {
  background(roadImg); //sets the image as the background
  if (keyIsDown(LEFT_ARROW)){
    carX-=4;
  }
  if (keyIsDown(RIGHT_ARROW)){
    carX+=4;
  }
  let collisionX = carX+290;
  let carY=380;
  

   // forms a barrier of sort which in turn results in the simulator to work

  for (let p of particles) {
    p.avoid(collisionX, carY); //condition that make the particles obey the rules 
    p.update();
    p.display();
  }
  push();
  translate(carX,0)

  if (car == 0) {
    drawCar1();
  } else if (car == 1) {
    drawCar2();
  } else if (car == 2) {
    drawCar3(); //if else if else helps in cycling between the three cars
  }
  pop()

}
function mouseClicked() {
  car = (car + 1) % 3; // keeps the calculation in range of 0 to 2
}
class Particle {
  constructor() {
    this.pos = createVector(1200, random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.life = random(100, 700);//this determines the position,velocity and acceleration of the particles while also giving the particles(in this case air ) a life like feel .As in making them disappear randomly in the range specified
  }

  avoid(carX, carY) {
    let target = createVector(carX, carY); //helps the particles determine the car
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);//to check the distance between car and particles

    if (d < 120) {
      let steer = p5.Vector.sub(this.pos, target);
      steer.setMag(0.5);
      this.acc.add(steer);//repulsion of particle is determined due to this part 
    }
  }

  update() {
    let n = noise(this.pos.x * 0.01, this.pos.y * 0.01, frameCount * 0.01);
    let angle = TWO_PI * n;
    this.acc.add(p5.Vector.fromAngle(angle).mult(0.1));//helps particle gain a direction

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;

    this.life -= 1;
    if (this.life < 0) {
      this.pos = createVector(1200, random(height));
      this.life = random(100, 700); // Resets the life as in reincarnates the particles
    }
  }

  display() {
    fill(100, 100, 100, 150);
    ellipse(this.pos.x, this.pos.y, 4);//colour and shape for particles
  }
}

function drawCar1() { //Red Car
  fill(200, 0, 0);
  rect(190, 330, 200, 50, 5);
  rect(220, 290, 120, 40, 10, 10, 0, 0);

  fill(255);
  rect(230, 295, 45, 30, 5);
  rect(285, 295, 45, 30, 5);

  fill(30);
  circle(230, 380, 50);
  circle(350, 380, 50);

  fill(210);
  circle(230, 380, 20);
  circle(350, 380, 20);

  fill(255, 255, 0);
  rect(375, 340, 15, 15, 5);
  rect(190, 340, 15, 15, 5);

  fill(270, 0, 0);
  rect(290, 340, 15, 5);
  rect(255, 340, 15, 5);
}

function drawCar2() { //Blue Car
  fill(0, 102, 204);
  rect(190, 290, 130, 90, 5);
  rect(315, 330, 70, 50, 0, 10, 0);

  fill(255);
  rect(270, 300, 40, 30, 5);
  rect(210, 300, 40, 30, 5);

  fill(30);
  circle(230, 380, 50);
  circle(350, 380, 50);

  fill(210);
  circle(230, 380, 20);
  circle(350, 380, 20);

  fill(255, 255, 0);
  rect(370, 340, 15, 15, 5);
  rect(190, 340, 15, 15, 5);
}
function drawCar3() { // Green Car
  fill(50, 150, 50);
  rect(190, 330, 220, 50, 10);
  arc(290, 335, 170, 100, PI, TWO_PI);

  fill(255);
  arc(290, 335, 150, 80, PI, PI + HALF_PI);
  arc(300, 335, 130, 80, PI + HALF_PI, TWO_PI);

  fill(30);
  circle(230, 380, 50);
  circle(360, 380, 50);

  fill(210);
  circle(230, 380, 20);
  circle(360, 380, 20);

  fill(255, 255, 0);
  rect(395, 340, 15, 15, 5);
  rect(190, 340, 15, 15, 5);
}
