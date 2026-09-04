// bg changed
                                     // loaded it in preload
//for paddle                         //added it in draw
let paddleX;
let x;
let y;

//speed of ball
let xSpeed = 2;
let ySpeed = 5;

// acceleration of ball
let ax = 0;
let ay = 0.04;

//array for particle
let px = [];
let py = [];
let psize = [];
let pr = [];
let pg = [];
let pb = [];

let bg;

function preload() {
  bg = loadImage("space2.jpg");   // loading bg
}

function setup() {
  createCanvas(600, 400);
  background(220);

  rectMode(CENTER);

  x = 1;
  y = 1;

  //create 50 particles
  for (let i = 0; i < 50; i++) {
    px[i] = random(width);
    py[i] = random(20, 300);

    psize[i] = random(15, 35);

    pr[i] = random(0);
    pg[i] = random(255);
    pb[i] = random(255);
  }
}

function draw() {
 
  image(bg, 0, 0, width, height);

  paddleX = mouseX; // mouse controlled

  //draw ball
  fill("red");
  // stroke(0);
  noStroke();
  ellipse(x, y, 20, 20);

  //speed of ball
  x = x + xSpeed;
  y = y + ySpeed;

  //acceleration of ball
  xSpeed = xSpeed + ax; // gravity
  ySpeed = ySpeed + ay;

  print(x);

  
  //bouncing from walls
  if (x >= width - 1 || x <= 1) {
    xSpeed = -xSpeed;
  }

  //bouncing from top wall
  if (y <= 1) {
    ySpeed = -ySpeed;
  }

  
  // planets creation
  for (let i = 0; i < 50; i++) { //50 particles
    if (psize[i] > 0) {
      fill(pr[i], pg[i], pb[i]);
      ellipse(px[i], py[i], psize[i]);

      let d = dist(x, y, px[i], py[i]);

      if (d < psize[i] / 2 + 10) {
        // psize[i]/2 = radius and 10 radius of ball thus touching

        ySpeed = -ySpeed; //bouncing from planets

        textFont("monospace"); //text after vanish
        textSize(16);
        fill("white");
        text("+1", px[i], py[i]);

        psize[i] = 0; // remove planets
      }
    }
  }

 // draw paddle
  fill("white");
  rect(paddleX, 370, 80, 10);

  if (ySpeed > 0) //ball moving downwards
    if (y > 360) {
      // paddle level is 370 and ball is 20 so radius 10 thus ball near paddle
     
      if (x > paddleX - 40) {  //left from centre
        // considering from centre

        if (x < paddleX + 40) { // right from centre
          ySpeed = -ySpeed; // bounce from paddle
        }
      }
    }
}
