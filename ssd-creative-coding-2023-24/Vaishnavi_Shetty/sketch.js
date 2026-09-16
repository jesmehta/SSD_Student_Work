let stars = [];
//declares array 'stars' to store instances of stars.

function setup() {
  createCanvas(400, 400);
  for (
    let i = 0;
    i < 1000;
    i++
  ) //for loop to create 'n' stars and add them to the star array.
  {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  for (let i = 0; i < stars.length; i++) //update the position of this star
  {
    stars[i].update();
    stars[i].display();
  }
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
    //set the initial position of the stars
  }

  update() {
    this.z -= 10;
    //move the star closer to the screen
    if (this.z < 1) {
      //if the star moves off the screen, reset its position
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  }

  display() {
    fill(255);
    noStroke();

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    //calculate the screen position of the stars
    let r = map(this.z, 0, width, 16, 0);
    //caltulate the size based on its depth.
    ellipse(sx, sy, r, r);
  }
}
function keyTyped() {
  if (key === "s") {
    saveCanvas("SketchName" + frameCount + ".jpg");
    print("file saved");
  }
  return false;
}
