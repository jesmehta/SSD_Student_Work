                     //NEON JUICE CENTER PIXEL GAMEEE

// added the background using particles, and sound effects  the score is now out of /5 

let items = []; // all the falling fruits properties will be put                     here. like size, position, img

let catcherWidth = 150;  //blender width

let catcherHeight = 150; //blender ht.

let score = 0;           //variable called score from zero

let gameState = "playing"; // a variable called gameState, controls which part of the game is currently active like the main gm or game over or successful

//variables will store the sound
let goodSound;
let winSound;
//let loseSound;


// These variables will store with images, size, font
let blenderImg;
let happyImg;
let sickImg;
let retroFont;

let goodFruitImg = [];   //goodfruit images [] this cause multiple
let badFruitImg = [];       //bad fruit images


function preload() {    //this func runs before game to load images                              and fonts so its ready to use
 
  blenderImg = loadImage("blender.png");   //variable blenderImg 
  happyImg = loadImage("happy.png");
  sickImg = loadImage("sick.png");
  retroFont = loadFont("retro.ttf");

  
  // Good fruit list 
  goodFruitImg.push(loadImage("orangee.png")); //push is put here                         cause there are multiple photos that will add
  
  goodFruitImg.push(loadImage("strawberryy.png"));
  goodFruitImg.push(loadImage("lemon.png"));

  
  
  //  Bad fruit list
  badFruitImg.push(loadImage("rotlime.png"));
  badFruitImg.push(loadImage("rotapple.png"));
  
  
  
  //sound
goodSound = loadSound("collectsound.mp3");
winSound = loadSound("successful.mp3");
//loseSound = loadSound("tryagain.mp3");
}


                             //SETUPPPPPPPPP
function setup() {
  createCanvas(400, 600);
  imageMode(CENTER); // images set up in their centerss, positioning                         and collisioning gets easier
  
  setupDust () ;     //bottom part for background
}



                           //DRAWWWWWWWW
function draw() {
  
  
if (gameState === "playing") {  //this checks if game is running or                                   not , if yes then game runsss
    
//background(115,53,163);       //background while game runs
  
  drawDust ();               

   
    
    
                      //Blender settingssss...
    
let catcherX = constrain( mouseX, catcherWidth / 3 ,width - catcherWidth / 3);     //this sets the horizontal pos of the blender 
                        //contrain makes sure that within boundaries
    
    
    
   
image(blenderImg, catcherX, height - catcherHeight/2 , catcherWidth, catcherHeight);               //Y pos fixed slightly above bottom

   
if (frameCount % 30 === 0) {  //new fruit will be created every                                      60 frames , 1 sec, 60  div by 2 cause i want 2 fruits in one frame
      
let isBad;

if (random(1) < 0.4) {
  isBad = true;
} else {
  isBad = false;
}                          // 40% chance for a bad fruit randomly
      
      
let selectedImage;    //Big variable that will store BOTH good bad                         Fruit imgs

      
  if (isBad) {         //if fruit bad it will be selected from                                    badFruitImg array
selectedImage = random(badFruitImg);
        
        
  } else {         //if fruit good it will be selected  from                                  goodFruitImg array
selectedImage = random(goodFruitImg);
      }

      
      
      let type;

if (isBad === true) {
  type = "bad";
} else {
  type = "good";
}
                         //FOR FALLLLL NOW
      
      let f = {                //new objt representing single fruit                                   
        
x: random(20, width - 20),     // Random horizontal pos to falling                                        fruit
        
y: 0,                         //fruits vertical pos at top of screen
        
img: selectedImage,           // assign selected img to fruit
        
size: 80,                    //size of fruit img
        
speed: random(6, 8),         //the speed of each fruit will vary
        
        
        
type: isBad ? "bad" : "good",
      };               //if isBad true then type is bad..or good

  
      items.push(f);  //in items now all the item things will go in
    }

  
  
  
  
                      //ACTUAL FALLINGGGGG
  
for (let i = items.length - 1; i >= 0; i--) {   //loop goes through                           all fruits in reverse order so not miss any
  
  
let f = items[i];             //here 1 fruit objt is selected 
  
  
f.y += f.speed; // Gravity adds the individual speed value to the Y forcing it down the screen. For fruit

  
  
              // putting f objts in the image now...
  
image(f.img, f.x, f.y, f.size, f.size);  //under img all this will be drawn , means fruit img is drawn with all pos and size properties
  

     
                  //blender and fruit collision
  
if (f.y > height -120 -f.size / 2 && f.y < height -120 + f.size /2 && 
                 //this line vertically checks if the fruit is                         touching the blender or not                      
    
    
    abs(f.x - catcherX) < catcherWidth / 3) {   
            //this line horizontally checks if the fruit is                                touching the blender or not  
  
  
  
  
                   //WHEN FRUIT GETS CAUGHTTTTTT
  
if (f.type === "good") {    //basically if fruit is good                                         youll score 1 point
 score++;
  
goodSound.play();
          
          
        } else {       //if fruit bad then gameStatchanges to lost,                          game over
          gameState = "lost"; 
        }
  
  
  items.splice(i, 1);   //removes fruit from array thats been                                   caught 
  
  
      } else if (f.y > height + f.size) {  
        
      items.splice(i, 1);          //removes fruit that falls below                                      screen
      }
    }

   
  
                      //Now comes the textttttttttt...
  
  //Top left juice text 
    textFont(retroFont);
    fill(255);                  //colour of font top left
    textAlign(LEFT, TOP);
    textSize(20);
    text("JUICE: " + score + "/5", 10, 10);  //current score seen

  
  
  
  
                       //When you winnnnn......
  
    if (score >= 5) {     //score 5 then gameState WON
      gameState = "won";
      winSound.play();
      
      
    }

   
                      // When you lose........
    
  } else if (gameState === "lost") {     //changes in back, image,                                              text
   
    background(81, 0, 0);
    
    let pulseSize = 250 + sin(frameCount * 0.1) * 10;
   image(sickImg, width/2, height/2 - 20, pulseSize, pulseSize);
    
  // sin- sine wave smoothly goes up down , the *10 gives smooth breathing pulse effect, and framC *0.1 also slow effect
    
    textFont(retroFont);
  fill(255, 0, 0);
   textAlign(CENTER, CENTER);
    textSize(55);
    text("GAME OVER", width / 2, height - 170);

   textSize(15);
   fill(255);
    text("CLICK TO RESTART", width / 2, height - 60);
     
    textSize (20);
    fill (255,0,0);
    text ("UH-OH! THAT WAS BAD", width/2, height/2 -200) ;

 // if (loseSound.isPlaying()); {  
 //  loseSound.play();
 // } 
    
    
                    // When you winnnnn........ 
    
  } else if (gameState === "won") {
    background(0, 50, 0);
    image(happyImg, width / 2, height / 2 - 20, 240, 150);

    textFont(retroFont);
    fill(57, 255, 20);
    textAlign(CENTER, CENTER);
    textSize(55);
    text("SUCCESS", width / 2, height -180);
    
    textSize (20);
    fill (57,255,20);
    text ("100% FRESH NEON JUICE", width/2, height/2 -200) ;

    textSize(15);
    fill(255);
    text("CLICK TO REPLAY", width / 2, height - 60);
    
    let pulseSize = 250 + sin(frameCount * 0.1) * 10;
    image(happyImg, width/2, height/2 - 20, pulseSize, pulseSize);
    
    //0.1 makes pulse smoother and *10 how much size changes
    
  }
}

           //click part to replay restart the game........
                  //so dont have to refresh it
               
function mousePressed() {
  
  userStartAudio();    //by click it starts
  
  if (gameState === "lost" || gameState === "won") {
    
    score = 0; // reset the score to 0, so even if win lose 0 start
    
    items = []; // Clear out any old fruits stuck above, from scratch                   it will begin
    
    gameState = "playing"; // switches back to the main game
  }
}


//SPACE/BUBBLE PARTICLE LOOK FOR NEON JUICE CENTERRR

let particles = [];      //empty now but will store x, y, size 

function setupDust () { 
  
  createCanvas(400, 600);
  
  for (let i = 0; i < 50; i++) {      //loop runs 50 times
    
  particles.push({         //above setting added to particles
    
    x: random(width),
    y: random(height),
    size: random(1, 6)
    
  });
}
}

function drawDust () {        //for backdrop
 
background(20,90);

for (let p of particles) {     //p represents one particle
  
  fill(200, 100, 255, 180);
  noStroke();
  ellipse(p.x, p.y, p.size);   //horizontal pos, vert pos, size of                                   particle

  
             //POSITIONNNNN
  p.y -= 1;                  //moves particle upwards

  if (p.y < 0) {          //if particle goes above screen
    p.y = height;          // moving it back to bottom
    p.x = random(width);   //new random horizontal pos
  }
}
}
