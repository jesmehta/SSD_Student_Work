let particles = [];

function setup() {
  createCanvas(400, 400);
 
   
  for (let i = 0; i < 50; i++) {
    particles.push(new box());
  }
}

function draw() {
  background(116, 234, 252,65);
    
noStroke()
 fill(123, 219, 136);
   

  rect(0, 300, 400, 100); 
  //grass
  fill(245, 244, 191);
  ellipse(200,250,100);
  //lower body
  fill(245, 244, 191);
  ellipse(200,185,70);
//face
  fill(245, 244, 191);
  ellipse(180,140,20,60);
  //ear
  fill(245, 244, 191);
  ellipse(220,140, 20, 60);
  //ear
 
  
  fill(247, 178, 231);
  ellipse(175,185,15,7);
  //blush
  fill(247, 178, 231);
  ellipse(225,185,15,7);
  //blush
  fill(245, 183, 69);
  stroke(179, 118, 5);
  strokeWeight(3);
  ellipse(80,60,70);
  strokeWeight(2);
 stroke(0);
  noFill()
  arc(200,190,17,17,195,PI)
  
 
  if (keyIsDown(RIGHT_ARROW)==true){
    for (let i = 0; i < particles.length; i++)
    {
    particles[i].movement();
    particles[i].show();}
    stroke(0);
    noFill()
    arc(200,190,17,17,190,TWO_PI)
    
  textAlign(CENTER,CENTER)
    text('X', 215,170)
    text('X',185,170);
    fill(0)
    
    rect(255,210,10,13)
    noStroke()
    fill(200);
    triangle(250,225,270,225,230,260);
    
    
    
  }
  else{
    
  fill(0)
    ellipse(185,170,8);
    ellipse(215,170,8)
    
  //eyes}
  }
}
class box {
  constructor() {
    this.positionx = width / 2;
    this.positiony = 250;
    this.speedx = random(-7, 7);
    this.speedy = random(-7, 7);
    this.boxside = random(5, 10);
  }

  movement() {
    this.positionx += this.speedx;
    this.positiony += this.speedy;
  }

  show() {
    noStroke();
    fill(230,0,0);
    circle(this.positionx, this.positiony, this.boxside);
    
  }
}
