//let sound;
let particles = [];
let img;
function preload()
{
  //sound=loadSound("audioo.mp3");
  img=loadImage('Facee.jpg');
}

function setup() {
  createCanvas(800, 600);
  extraCanvas=createGraphics(800,600);
  extraCanvas.background(0,0,0,255);
  
}

function draw() {
  
  frameRate(100);
  background(0, 100);
  image(extraCanvas,0,0);

  let p = new Particle();
  particles.push(p);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    // Remove particles- opt
    if (particles[i].offScreen()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = -10;
    this.speed = random(1);
    this.length = random(600, 700);
    this.dottedSpacing = random(10);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    strokeWeight(0.3);
    stroke(0, 255, 0); // Green color
    if (mouseIsPressed) {
      stroke(255, 0, 0);
      strokeWeight(0.8);
      noFill();
      line(this.x, this.y, this.x, 30);
      //sound.play();
    }
    
    // dotted line
    for (let i = 0; i < this.length; i += this.dottedSpacing) {
      let dotX = this.x;
      let dotY = this.y + i;
      line(dotX, dotY, dotX, dotY +2); 
  }
  }

  offScreen() {
    return this.y - this.length > height;
  }
}
