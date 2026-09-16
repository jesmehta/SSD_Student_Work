class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.maxSpeed = 3;
    this.prevPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
     this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  display() {
    
    let px = constrain(floor(this.pos.x), 0, img.width - 1);
    let py = constrain(floor(this.pos.y), 0, img.height - 1);
    let imgColor = img.get(px,py);
    
    //imgColor [3] = 100;
    
    
    
    stroke(imgColor);
    strokeWeight(1);
    line (this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y )
    //this.updatePrev();
  }

  updatePrev () {
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y
  }
  
 wrap() {
  if (this.pos.x > width) {
    this.pos.x = 0;
    this.updatePrev();
  }
  if (this.pos.x < 0) {
    this.pos.x = width;
    this.updatePrev();
  }
  if (this.pos.y > height) {
    this.pos.y = 0;
    this.updatePrev();
  }
  if (this.pos.y < 0) {
    this.pos.y = height;
    this.updatePrev();
  }
}
  
  blackHole(center, radius) {
  let dir = p5.Vector.sub(center, this.pos);
  let d = dir.mag();

  if (d < radius) {
    dir.normalize();
    let swirl = createVector(-dir.y, dir.x);

    let pullPower = map(d, 0, radius, 3, 0.2);
    let swirlPower = map(d, 0, radius, 3, 0.2);

    dir.mult(pullPower);
    swirl.mult(swirlPower);

    this.applyForce(dir);
    this.applyForce(swirl);
  }
 }
}
