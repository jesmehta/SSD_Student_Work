let ob = [];

function setup() 
{
  createCanvas(600, 600);
  for (let i = 0; i < 100; i++) //no of particles 
  {
    ob[i] = new Particle();
  }
  colorMode(HSB);
}

function draw() 
{

  let hue = 
      map(mouseX, 0, width, 0, 360);//colour changes from 0 to 360 
  let saturation = 
      map(mouseY, 0, height, 0, 100);
  background(hue, saturation, 100);

  for (let i = 0; i < ob.length; i++) 
  {
    ob[i].update();
    ob[i].display();
  }
}

class Particle 
{
  constructor() 
  { //properties of particles
    this.x = random(width);
    this.y = random(height);
    this.stepX = random(-5, 5);
    this.stepY = random(-5, 5);
    this.c = random(360);//size
    this.shapeSides = 3; // Start with a triangle
    // Initial size of the particle
    this.size = random(10, 60);
  }

  update() 
  {
    this.x += this.stepX;//increment along x axis 
    this.y += this.stepY;//increment along y axis 

    if (this.x < 0 || this.x > width) 
    {
      this.stepX = -this.stepX; //bounce along x axis 
    }
    if (this.y < 0 || this.y > height) 
    {
      this.stepY = -this.stepY;//bounce along y axis 
    }
    
    this.size = 
      map(mouseX, 0, width, 10,200);
    //size changes from small to large 
  }

  display() 
  {
    fill(this.c, 100, 100);//hsb 
    let angle = TWO_PI /this.shapeSides;
    beginShape();
    for (let i = 0; i < this.shapeSides; i++) 
    {
      let xPos = this.x + cos(angle * i) * this.size / 2;//angle along x axis
      let yPos = this.y + sin(angle * i) * this.size / 2;//angle along y axis 
      vertex(xPos, yPos);//adds vertex to shape 
    }
    endShape(CLOSE);
  }
}

function mouseClicked() //interactive 
{
  for (let i = 0; i < ob.length; i++) 
  {
    ob[i].shapeSides++;
    if (ob[i].shapeSides > 20) //triangle, square, pentagon,hexagon, heptagon, octagon  
    {
      ob[i].shapeSides = 3; // Reset to triangle if more than 8 sides
    }
  }
}
