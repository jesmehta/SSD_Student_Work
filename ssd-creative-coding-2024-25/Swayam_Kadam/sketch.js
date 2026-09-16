let inc = 0.1;
let scl = 10;
let rows, cols;
let zoff = 0;
let particles = [];
let flowfield;
let img;
let deleteParticleR = 200;

function preload () {
  img = loadImage('sim.png');
}

function setup() {
  createCanvas(600, 400);
  cols = floor(width / scl);
  rows = floor(height / scl);
  
  flowfield = new Array(cols * rows);

  for (let i = 0; i < 4500; i++) {
    particles[i] = new Particle();
  }
   img.resize(600,0)
   background(255)
}

function draw() {

  let yoff = 0;
  for (let y = 0; y < rows; y += 1) {
    let xoff = 0;
    for (let x = 0; x < cols; x += 1) {
      let index = (x+y*cols);
      let angle = noise(xoff, yoff, zoff) * TWO_PI*4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      flowfield[index] = v;
      xoff += inc;

       fill(angle);
       stroke(0, 50);
      // push();
      // strokeWeight(1);
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();

    }
    yoff += inc;
  }
  zoff += 0.003;
   for (let i = 0; i < particles.length; i++) {
   particles[i].follow (flowfield);
     
  let midP = createVector(mouseX, mouseY);
  particles[i].blackHole(midP, 200);
  
  particles[i].update();
  particles[i].wrap();
  particles[i].display();
 }
}


