let a;
let darkLayer;
let sze = 150;
let power = 255;
let decrease = 0.1;
let score = 0;
let offsetX = 0;
let moveSpeed = 5;

let batteryPositions = [
  { x: 410, y: 156 },
  { x: 70, y: 190 },
  { x: 300, y: 210 },
  { x: 500, y: 283 },
  { x: 850, y: 250 },
  { x: 630, y: 230 },
  { x: 730, y: 290 }
];

function preload(){
  font = loadFont("PixelifySans-Regular.ttf");
  music = loadSound("night8bit.mp3")
}

function setup() {
  createCanvas(600, 300);
  music.play()
  noCursor()
  strokeWeight(2);
  textFont(font);
  darkLayer = createGraphics(600, 400);
  angleMode(DEGREES)
  fly1 = new Fly(0,100)
  fly2 = new Fly(600,300)
  let pos = batteryPositions[2];
  a = new Battery(pos.x, pos.y);
}

function draw() {
  background(142, 142, 120);

  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
    offsetX += moveSpeed;
  }
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    offsetX -= moveSpeed;
  }
  offsetX = constrain(offsetX, -600, 0);
  
  
  push();
  translate(offsetX, 0);
  if (sze > 5) {
    drawWindow(40, 80);
    drawWindow(800, 80);
    drawShelf(390, 100);
    drawTable(200, 220);
    drawChair(355, 250, 1);
    drawChair(120, 250, 2);
    drawDoor(1000, 80);
    drawSofa(700, 250);
    drawEndTable(610, 240);
    a.show();
    if(power > 150){
      fly2.update()
      fly2.show()
    }
    if(power > 100){
      fly1.update()
      fly1.show()
    }
  
    
  }
  pop();
  if (sze > 5) {
    darkLayer.clear();
    darkLayer.noStroke();
    darkLayer.fill(0, 248);
    darkLayer.rect(0, 0, width, height);

    darkLayer.erase(power);
    darkLayer.ellipse(mouseX, mouseY, sze);
    darkLayer.noErase();

    sze -= decrease;
    power -= decrease*1.2;

    image(darkLayer, 0, 0);

    fill(255);
    textSize(14);
    text("Score: " + score, 10, 20);
  } else {
    music.stop()
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(40);
    text("Game Over", width / 2, height / 2);
    textSize(20);
    text("Score: " + score, width / 2, height / 2 + 40);
  }
  ellipse(mouseX, mouseY, 6, 6);
}

function mousePressed() {
  if (a.clicked(mouseX - offsetX, mouseY)) {
    let plus = random(10, 50);
    sze += plus;
    power += plus;    
    sze = min(sze, 150);
    power = min(power, 255);
    a.respawn();
    score++;
  }
}
