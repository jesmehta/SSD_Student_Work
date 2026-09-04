let x;
let y;
let img;  //background image
let img2; //dustbin image
let img3; //crumbled paper
let sound;

let ySpeed = 0.5; //falling speed of paper
let gravity = 0.2; 

let gameState = "play"; //game starts/wins/lose

// dustbin position
//let binX = 80;
//let binY = 350;
//let binW = 60;

function preload() {
  img = loadImage("classroom.jpg");
  img2 = loadImage("Dustbin.png");
  img3 = loadImage("crumbledpaper.png");
  sound = loadSound("throw.mp3");
}

function setup() {
  createCanvas(400, 400);
  x = random(10,390);
  y = 50;
}

function draw() {

  background(220);
  image(img, 0, 0, 400, 400);
  image(img2, 80, 350, 60, 60);
  image(img3, x, y, 40, 40);

  if (gameState === "win") {//  win 
    fill("green");
    textSize(40);
    textAlign(CENTER);
    text("YOU WON!", width / 2, height / 2);
    noLoop();
    return;
  }

  if (gameState === "lost") { //  lost
    fill("red");
    textSize(40);
    textAlign(CENTER);
    text("YOU LOST!", width / 2, height / 2);
    noLoop();
    return;
  }

  // gravity
  ySpeed += gravity;
  y += ySpeed;

  // mouse bounce
  let d = dist(mouseX, mouseY, x, y);

  if (d < 40) {
    ySpeed = -9;
    sound.play();
  }

  // when ball touches the floor
  if (y >= 350) {

    // inside dustbin
    if (x > 60 && x < 60 + 50) {//space where the ball touches to win. syntax check the location of the paper in the x axis, when y is >350
      
      gameState = "win";
    } 
    else {
      gameState = "lost";
    }
  }
}

// drag paper
function mouseDragged() {
  x = mouseX;
}