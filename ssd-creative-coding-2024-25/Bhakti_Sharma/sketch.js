//final, glitch stops after 7 secs
let topImg, bottomImg, crumpleTexture;
let particles = [];
let topLayer;

let burnTime = 0; //count burn frames
let burnLimit = 180; // 18 seconds at 10fps

let glitchTime = 0; //count glitch frames
let glitchDuration = 70; // 7 seconds at 10fps

function preload() {
  topImg = loadImage("sm logo.jpg"); // top image
  bottomImg = loadImage("sm duo 5.jpg"); // revealed image
  crumpleTexture = loadImage("crum2.jpeg"); // crumpled paper texture
}

function setup() {
  createCanvas(500, 500);
  frameRate(10);
  crumpleTexture.resize(width, height); //fit canvas

  // top image with crumple texture overlay
  topLayer = createGraphics(width, height); //top layer, same size
  topLayer.image(topImg, 0, 0, width, height); //topImg on top layer
  topLayer.tint(255, 100); // crumple transparency, color filter
  topLayer.image(crumpleTexture, 0, 0, width, height); //crumple on top layer
}

function draw() {
  // Show bottom image, drawn every frame not once
  image(bottomImg, 0, 0, width, height);

  // burn ends, glitch bottom image for 7s
  if (burnTime >= burnLimit && glitchTime < glitchDuration) {
    applyGlitch();
    glitchTime++; // count glitch frames
  }

  // Fire particles while burning, then discard i
  if (burnTime < burnLimit) {
    for (let i = 0; i < 10; i++) {
      particles.push(new FireParticle(mouseX, mouseY));
    }
    burnTime++;
  }
  // reverse loop to remove particles
  //-1 as array, so length=4 but i=3; i = array index
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i]; //i-th particle=p
    p.update(); //update speeds and disappear bits
    p.show(); // show fire bits

    // burn holes in top layer
    topLayer.erase(255, 20);
    topLayer.ellipse(p.x, p.y, 40, 40);
    //invisible? delete from array
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  // draw top layer with burnt holes
  image(topLayer, 0, 0);
}

class FireParticle {
  constructor(x, y) {
    this.x = x; //current x
    this.y = y; //current y
    this.vx = random(-1, 1); //x speed
    this.vy = random(-4, -1); //y speed
    this.alpha = 255; //transparency
    this.size = random(4, 8); //size
  }

  update() {
    this.x += this.vx; //update x speed
    this.y += this.vy; //update y speed
    this.alpha -= 5; //to make bits disappear
  }

  show() {
    noStroke();
    fill(255, 100, 0, this.alpha); //fire  color
    ellipse(this.x, this.y, this.size); //draw fire bits
  }
}

// glitch horizontal strips of revealed image
function applyGlitch() {
  for (let i = 0; i < 10; i++) {
    let y = random(height); // random vertical position
    let h = random(1, 5); // height of the strip
    let xShift = random(-20, 20); // move the strip left/right

    // get a small horizontal strip from the bottom image
    let strip = bottomImg.get(0, y, width, h);
    // draw the strip at new x,y
    image(strip, xShift, y);
  }
}
