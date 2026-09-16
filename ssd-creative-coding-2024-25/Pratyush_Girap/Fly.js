class Fly {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 3));
    this.acc = createVector(0, 0);
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(mouse, this.pos);
    this.acc.setMag(0.1);
    this.vel.add(this.acc);
    this.vel.limit(4);
    this.pos.add(this.vel);

    this.pos.y += sin(frameCount * 10) * 0.5;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);

    let wingAngle = sin(frameCount * 20) * 10;

    fill(220);
    stroke(0);
    strokeWeight(1.5);

    push();
    rotate(wingAngle);
    ellipse(-9, 0, 10, 4);
    pop();

    push();
    rotate(-wingAngle);
    ellipse(9, 0, 10, 4);
    pop();

    fill(255);
    ellipse(0, 0, 10, 10);
    pop()
  }
}
