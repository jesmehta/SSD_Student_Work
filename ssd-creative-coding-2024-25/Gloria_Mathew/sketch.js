let soapX, soapY;
let lastSpawnTime = 0;
let soapDuration = 3500; 
let tornado=[];
let lastEllipseTime=0;
let lastEmojiTime=0;
let ellipseCount = 1;  //start with 1
let emojiCount = 0; 
let maxEllipses = 32; 
let maxEmojis = 14;
let soapSize=30;
let startTime; // Stores when the sketch begins
let bgColor; 
let score =0;

let bgm, clock, rip, win;
let soapClick, corona;

function preload() {
  // Load sound files (replace with actual file paths)
  bgm = loadSound("90s.bg.mp3");
  clock = loadSound("tic.mp3");
  rip = loadSound("death.mp3");
  //win = loadSound("victory.mp3");
  soapClick = loadSound("soap.mp3");
  corona= loadSound("corona.mp3");
}

function setup() {
  createCanvas(500, 500);
 startTime = millis(); 
  bgColor=color(255);
  
   bgm.loop();
  bgm.setVolume(0.8);

  //first 30 seconds
  clock.loop();
  clock.setVolume(0.5);
  
   for(let i=0; i < ellipseCount;i++){
  let ob = new Bouncer(random(width),
    random(height),
    random(-2,2),
    random(-2,2),
      10,10                 
  );
  tornado.push(ob);
  }
  spawnSoap();
}

function draw() {
    let elapsedTime = millis() - startTime;
  
    // Stop clock after 30 seconds
  if (millis() > 30000) {
    clock.stop();
  }
  
 if (score < 8 && millis() > 30000) { //  game to run for 30 sec 
   bgm.stop();
    rip.play(); // Play RIP 
    rip.setVolume(1.0);
   
    bgColor=color(0);
    background(bgColor);
    fill(255); // White text
    textSize(50);
    textAlign(CENTER, CENTER);
    text("R.I.P", width / 2, height / 2);
    noLoop(); 
    return;
}

  //Stop the sketch after 2.5min
  if (elapsedTime > 150000) {
    win.stop();
    noLoop();
    return;
  }
  if (elapsedTime > 60000 && elapsedTime <= 120000) {
    let redValue = map(elapsedTime, 60000, 120000, 220, 255); // red at 255
    let whiteFade = map(elapsedTime, 60000, 120000, 255, 0);  // Gradually fade white 
    bgColor=color(redValue, whiteFade, whiteFade);
}
  
// yellow 2 min - 2.5 min**
  if (elapsedTime > 120000 && elapsedTime <= 150000) { 
     
  bgColor=color(255, 255, 100);
  }
 background(bgColor);
  
   //after 2mins
  if (elapsedTime > 120000) {
    bgm.stop(); 
    //win.play(); 
    //win.setVolume(0.6);
    textSize(40);
    fill(0);
    textAlign(CENTER,CENTER)
    text("Vaccines are here!",width/2,height/2);
    
    return; // Prevents further rendering of objects
  }
  
  fill(0);
textSize(20);
text("Score: " + score, 10, 20);
  
 textSize(30)
    text("😃",mouseX,mouseY);
 //Soap
  if(elapsedTime<=120000){
  if (millis() - lastSpawnTime < soapDuration) {
    text("🧼", soapX, soapY);
  } else {
    spawnSoap(); // Reposition the soap after 3 seconds
  }

  //ellipse
  if(millis()-lastEllipseTime>4000 && ellipseCount<maxEllipses){

        let ob1 = new Bouncer(random(width), random(height), random(-2, 2), random(-2, 2), 10, 10);
      tornado.push(ob1);
    ellipseCount++;
    lastEllipseTime = millis(); // Reset timer
  }
  //fever
  if(millis()-lastEmojiTime>8000 && emojiCount<maxEmojis){
   let ob2= new Bouncer(random(width), random(height), random(-2, 2), random(-2, 2), 10, 10);
      tornado.push(ob2);
    emojiCount++;
      ob2.isFeverEmoji = true;//flag
    lastEmojiTime = millis(); // Reset timer
  }
     for(let i=0;i<tornado.length;i++){
       tornado[i].stayAwayFromSoap();
    tornado[i].display();
    tornado[i].update();
       
       // Check smiley touches  ellipse or emoji 
  let distanceToOb = dist(mouseX, mouseY, tornado[i].x, tornado[i].y);
  if (distanceToOb < 10) { 
    score--; // Decrease score
    corona.play()
  }
}
  }
   
 }

// Function to generate a new random position for the soap
function spawnSoap() {
  soapX = random(width);
  soapY = random(height);
  lastSpawnTime = millis();
  }

function mousePressed() {
  let distanceToSoap = dist(mouseX, mouseY, soapX, soapY);
  if (distanceToSoap < soapSize) {
    spawnSoap();// Reposition 
    score++;
    soapClick.play()
  }
}

class Bouncer {
  constructor(x, y, stepX, stepY, w, h) {
    this.x = x;
    this.y = y;
    this.stepX = stepX;
    this.stepY = stepY;
    this.w = w;
    this.h = h;
    this.c = color(random(0,200),random(0,255),random(0,200));
    this.isFeverEmoji = false;
  }
  display() {
    fill(this.c)
   if (this.isFeverEmoji) {
      fill(200,0,0)
     circle(this.x+13,this.y-9,30)
      textSize(20);
      text("🤒", this.x, this.y); // Display fever emoji
    } else {
      ellipse(this.x, this.y, 10, 10); // Display normal ellipse
    }
    }

  update() {
    this.x = this.x + this.stepX;
    this.y = this.y + this.stepY;
    
    this.bounce();
  }
  bounce() {
    if (this.x > width || this.x < 0) {
      this.stepX = -this.stepX;
    }
    if (this.y > height || this.y < 0) {
      this.stepY = -this.stepY;
    }
  }
  stayAwayFromSoap(){
    let distance = dist(this.x, this.y, soapX, soapY);
    if (distance < 20 + soapSize) {
      
      let pushX = (this.x - soapX) * 1.5; //
        let pushY = (this.y - soapY) * 1.5; 

        this.x = soapX + pushX;
        this.y = soapY + pushY;
  }
}
}

