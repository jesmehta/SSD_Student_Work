let score=0;
let particles = [];
let objects=[]
let emitter; // NEW: emitter position
let direction; // NEW: current direction (used for particle acceleration)
let shooting = false; // NEW: is space being held down?
let imageA1,imageB1,imageA2,imageB2,imageA3,imageB3;
let currentImage;
let lastDirection='right';
let imagebackground;
function preload(){
 imageA1=loadImage('chibideino-left.png');
 imageB1=loadImage('chibideino-right.png');
 imageA2=loadImage('chibizweilous-left.png');
 imageB2=loadImage('chibizweilous-right.png');
 imageA3=loadImage('chibihydreigon-left.png');
 imageB3=loadImage('chibihydreigon-right.png');
 imagebackground=loadImage('battlefeild.jpg');
}
 
function setup() {
  createCanvas(600, 400);
 imagebackground.resize(width,0)
  //image(imagebackground,0,0)

  
  noCursor();
  emitter = createVector(width / 2, height / 2); // Start emitter at center
  direction = createVector(0, 0); // No movement initially
  currentImage=imageA1
}

function draw() {
  //background()

  //imageMode(CENTER);
image(imagebackground,0,0,width, height);



  if (direction.x < 0) lastDirection = 'left';
else if (direction.x > 0) lastDirection = 'right';
  
  // Handle evolution stage based on score
   if (score >= 20) {
    currentImage = (lastDirection === 'left') ? imageA3 : imageB3;
  } else if (score >= 10) {
    currentImage = (lastDirection === 'left') ? imageA2 : imageB2;
  } else {
    currentImage = (lastDirection === 'left') ? imageA1 : imageB1;
  }

  // Move emitter
  emitter.add(direction);
  emitter.x = constrain(emitter.x, 0, width);
  emitter.y = constrain(emitter.y, 0, height);
  
 
  // Show emitter as an image
imageMode(CENTER);
  
image(currentImage, emitter.x, emitter.y, 100, 100); // Adjust size as needed
imageMode(CORNER)

  // Create new particles if shooting
  if (shooting && direction.mag() !== 0) {
    particles.push(new Particle(emitter.x, emitter.y, direction));
  }

  // Update and show particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();

    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
  
   // Update and show objects
  for (let i = objects.length - 1; i >= 0; i--) {
    let o = objects[i];
    o.update();
    o.show();
    if (o.isDead()) {
      objects.splice(i, 1);
    }
  }
  // Check collisions between particles and offscreen objects
for (let i = particles.length - 1; i >= 0; i--) {
  let p = particles[i];
  for (let j = objects.length - 1; j >= 0; j--) {
    let o =objects[j];
    let d = dist(p.pos.x, p.pos.y, o.pos.x, o.pos.y);
    if (d < 10) {
      objects.splice(j, 1); // Remove object
      score += 1;             // Increase score
       break;                  // Stop checking this particle
     }
   }
 }




// Every 60 frames (~1 sec at 60fps), spawn one offscreen object
if (frameCount % 160 === 0) {
  spawnOffscreenObject();
 }


// Display score
fill(255);
textSize(20);
textAlign(LEFT, TOP);
text("Score: " + score, 10, 10);

}

function keyPressed() {
  if (key === 'w' || key === 'W') direction.y = -1;
  if (key === 's' || key === 'S') direction.y = 1;
  if (key === 'a' || key === 'A') 
  {direction.x = -1;
   
  }
  if (key === 'd' || key === 'D') 
  {direction.x = 1;
   
  }

  if (key === 'g') {
    shooting = true; // Start shooting when space is pressed
  }
}

function keyReleased() {
  if (key === 'w' || key === 'W' || key === 's' || key === 'S') direction.y = 0;
  if (key === 'a' || key === 'A' || key === 'd' || key === 'D') direction.x = 0;

  if (key === 'g') {
    shooting = false; // Stop shooting when space is released
  }
}

function spawnOffscreenObject() {
  let edge = floor(random(4)); // 0=top, 1=right, 2=bottom, 3=left
  let x, y, vel;

  if (edge === 0) {
    // Top
    x = random(width);
    y = -10;
    vel = createVector(0, random(0.1, 3));
  } else if (edge === 1) {
    // Right
    x = width + 10;
    y = random(height);
    vel = createVector(random(-0.3, -1), 0);
  } else if (edge === 2) {
    // Bottom
    x = random(width);
    y = height + 10;
    vel = createVector(0, random(-0.3, -1));
  } else if (edge === 3) {
    // Left
    x = -10;
    y = random(height);
    vel = createVector(random(0.1, 3), 0);
  }

  // Push it as a "particle" (you can later customize the shape/type)
  objects.push(new OffscreenObject(x, y, vel));
}

class Particle {
  constructor(x, y, accVec) {
    this.pos = createVector(x, y);
     this.vel = accVec.copy().normalize().mult(5); 
    //this.acc = accVec.copy().normalize().mult(0.2); // Normalize to keep consistent
    this.acc = p5.Vector.random2D().mult(0.4); // More chaotic spreading

    this.lifetime = 125;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0.5);
    this.lifetime -= 1;
  }

  show() {
    noStroke();
    fill(192,57,255, this.lifetime);
    ellipse(this.pos.x, this.pos.y, 8);
  }

  isDead() {
    return this.lifetime < 0;
  }
}

class OffscreenObject {
  constructor(x, y, velocity) {
    this.pos = createVector(x, y);
    this.vel = velocity;
    this.lifetime = 400; // optional if you want fading/removal
  }

  update() {
    this.pos.add(this.vel);
    this.lifetime--;
  }

  show() {
    noStroke();
    fill(0, 255, 0); // Green to distinguish
    ellipse(this.pos.x, this.pos.y, 12); // Bigger size
  }

  isDead() {
    return this.lifetime < 0;
  }
}
