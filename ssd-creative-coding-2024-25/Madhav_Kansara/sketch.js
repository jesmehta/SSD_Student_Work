// variables
let x = 200;
let y = 350;
let c = 0;
let d = 0;
let score = 0;
var strt = 0
let s = 0.5


// arrey of the bullets and the rock 
let bullets = [];
let r = [];

// putting the image of the spaceship , and the soundeffects.
function preload() {
  img1 = loadImage("spaceship.png");
  font= loadFont ("PixelifySans-VariableFont_wght.ttf");
   music = loadSound("blaster-2-81267.mp3");
  music2 = loadSound("gun-firing-117043.mp3")
}

function setup() {
  createCanvas(400, 400);
  
   pixelDensity(1)

  // resizing the image (Spaceship)
  img1.resize(60, 0);
  
  // how many rocks do I want to spawn on the canvas 
  for (let j = 0; j < 30; j++) {
    r[j] = new rocks();
  }
}

function draw() {
  background(0);

  // the background (space)
  loadPixels();
  for(var a = 0; a<width; a++){
      var aoff = a*0.01
      for(var b = 0; b<height; b++){
        var boff = b*0.01 - strt
        var index = (a + b * width)*4
        var p = noise(aoff,boff) * 255
        var g = noise(aoff+1000,boff) * 255
        var o = noise(aoff+10000,boff) * 255
        pixels[index] = p;
        pixels[index+3] = 255;
      }
  }
  strt += 0.1
  updatePixels();

  
  //the Spaceship
  Spaceship(x, y);

  //move ship left and right
  x = constrain(x, 0, 340);
  if (keyIsDown(LEFT_ARROW)) {
    x -= 3;
  } else if (keyIsDown(RIGHT_ARROW)) {
    x += 3;
  }

  //move ship up and down 
  y = constrain(y, 300, 340);
  if (keyIsDown(UP_ARROW)) {
    y -= 2;
  } else if (keyIsDown(DOWN_ARROW)) {
    y += 2;
  }
// keeps displaying, updating and generate the rock 
  for (let j = 0; j < r.length; j++) {
    r[j].update();
    r[j].display();
  }
//keeps generating the bullets 
  for (let i = 0; i < bullets.length; i++) {
    
    // when the bullet hits the rocks should disapper and make the sound when it hits.
    for (let j = 0; j < r.length; j++) {
      if (r[j].hits(bullets[i].x, bullets[i].y)) {
        r[j].respawn();
      score = score+ 1 
        music2.play()}
    }
    

    bullets[i].update();
    bullets[i].display();

    
    // the bullet should disapper when it goes out side the canvas
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }
  
  // the score board 
  fill('yellow');
   noStroke();
  textFont(font)
  textSize(15)
  text(score, 0,10)
  if (score> 1){
    textSize(50)
    fill ('green ')
    text ('YOU WIN!', width/2 - 100, height/2)
  }
  

  
}


// function of the spaceship 
function Spaceship(x, y) {
  image(img1, x, y);
}

// Bullets
class Bullet {
  constructor(x, y) {
    
    // variables of the bullet 
    this.x = x + 28;
    this.y = y;
    this.w = 3;
    this.h = 15;
    this.stepY = 5;
    this.col = color(random(255), random(255), random(255));
  }

  // helps to move the bullet 
  update() {
    this.y -= this.stepY;
  }

  // about the bullets , how should it look 
  display() {
    noStroke();
    fill(this.col)
    rect(this.x, this.y, this.w, this.h);
  }

  
}
// the Aliens 
class rocks {
  constructor(e, f) {
    // variables of the rocks 
    this.e = random(width);
    this.f = random(-200, -100);
    this.g = random(10, 20);
    this.h = random(10, 40);
    this.i = random(width); 
      this.j = random(-200, -100);
    this.k = random(width);
    this.l = random(-200, -100);
    this.stepF = 1;
    this.stepJ = 1
    this.colors = color(random(255), random(255), random(255))
  }

  
  // this will keep updating the rocks from the top of the canves
  update() {
    if (this.f > 420) {
      this.respawn();
    }
    if (this.j > 420){
      this.respawn();
    }
// help to move the rocks 
    this.f = this.f + this.stepF;
    this.j = this.j + this.stepJ;
  }

  // respawns the rocks when it hits the bullet 
  respawn() {
    this.j = random(-400, -100);
    this.i = random(width)
    this.f = random(-400, -100);
    this.e = random(width);
  }

  // displays the rocks 
  display() {

    noFill();
  stroke(color(random(255), random(255), random(255)));
  strokeWeight(3);
  rect(this.i, this.j, 10,10)
  line(this.i -5 , this.j + 12 , this.i + 15, this.j +12)
  line(this.i +5, this.j + 7 ,this.i + 5, this.j +20)
  rect(this.i ,this.j + 15,10,1);
  square(this.i - 5,this.j - 5,5);
  square(this.i + 10,this.j - 5 ,5);
  square(this.i-1,this.j+22,3);
    square(this.i+8,this.j + 22,3);
    
  }

  // at what distance does the rock get hit and and sends it back 
  hits(x, y) {
    let d = dist(this.i, this.j, x, y);
    // if the distance is less then the rock size then it true
    return d < this.g;
  
  }
}

// when the key is pressed it should shoot the bullets and make the sound of the bullet  
function keyPressed() {
  if (key === " ") {
    bullets.push(new Bullet(x, y));
     music.play()
  }
}
