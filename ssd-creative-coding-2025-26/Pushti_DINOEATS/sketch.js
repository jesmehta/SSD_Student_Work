let faces = [];
let x, y; //dino's position
let bg; //variable to keep the background image
let bgMusic; //variable for background music
let gameOver = false; //game is still running
let score = 0; //intially score is 0

function preload() {
  bg = loadImage("black bg.jpg"); //it will load the bg image first before anything else runs
  bgMusic = loadSound("gaming.mp3"); // it will load music file
}

function setup() {
  createCanvas(400, 400);
  bgMusic.loop(); //so that itb runs throughout till game end
  for (let i = 0; i < 11; i++) {
    //loop is pushing 11 face elements into the face array and chose 11 because it was matching the timing , each with random x position so they dont appear at once
    faces.push({
      //instead of manually writing 11 seperate faces i  added loop so that it creates automatically
      x: random(80, 320), //this position felt apt as i wanted to keep faces away from the edges
      y: i * -150, //negative as they are in y-axis and above y-axis as more negative, higher it is , canvas at start
      speed: random(5, 7),
    }); //added speed that fitted
  }
}

function draw() {
  //runs continuosly,60 times per sec
  background(220); // clears the previous frame so things not smear
  image(bg, 0, 0, 400, 400);
  strokeWeight(5);

  let timeLeft = 10 - floor(frameCount / 60); //60 frames per sec
  //countdown of 10 secs and when its over the game ends
  if (timeLeft <= 0) {
    gameOver = true; //when the time ends the gameOver is true
  }

  //GAME OVER
  if (gameOver) {
    bgMusic.stop(); //after meeting the condition the bgm stops as the gameis over
    fill(0, 150, 123, 125);
    rect(0, 0, 400, 400);
    textSize(45);
    textAlign(CENTER, CENTER);
    text("GAME OVER", 200, 180);
    textSize(20);

    //SCORE
    text("Humans eaten:" + score, 200, 230);
    return; // to stop drawing everything else
  }

  //SCORE DISPLAY DURING GAME
  textAlign(RIGHT, TOP);
  text("Humans eaten: +score,390,10"); //position for this text

  // dino position
  x = mouseX - 70; //subtracted values to center the drawing around the cursor
  y = mouseY - 100;

  //  DINO
  noStroke();

  fill(0, 200, 9);
  rect(x + 50, y + 50, 40, 40); //head

  fill(0);
  rect(x + 75, y + 60, 5, 5); //eye

  strokeWeight(2);
  fill(0, 200, 9);
  rect(x + 50, y + 90, 20, 40); //neck

  fill(0, 200, 9);
  rect(x + 6, y + 90, 55, 40); //main body

  rect(x + 15, y + 110, 14, 45); //left leg
  rect(x + 45, y + 110, 14, 45); //right leg

  fill(100, 200, 9);
  rect(x + 70, y + 105, 20, 5);
  rect(x + 65, y + 95, 35, 5); //tail highlights

  fill(0, 200, 9);
  arc(x + 2, y + 99, 47, 47, 0, PI + QUARTER_PI); //tail

  fill(0, 150, 0);
  triangle(x + 20, y + 90, x + 30, y + 70, x + 40, y + 90);
  triangle(x + 40, y + 90, x + 50, y + 65, x + 55, y + 90);
  triangle(x + 25, y + 90, x + 5, y + 70, x + 5, y + 90); //mainbodyspikes

  triangle(x + 55, y + 50, x + 62, y + 35, x + 70, y + 50);
  triangle(x + 70, y + 50, x + 78, y + 30, x + 85, y + 50); //headspikes

  // FACES
  for (let i = 0; i < faces.length; i++) {
    let f = faces[i];

    f.y += f.speed; // move face downwards (falling effect)

    // if face goes below canvas, it will reset above the screen
    if (f.y > height + 150) {
      f.y = random(-400, -100); //for it to go back to top
      f.x = random(80, 320); //new x random position
    }

    drawFace(f.x, f.y); //// drawface at its position
  }
}

// FACE FUNCTION
function drawFace(x, y) {
  push(); //wanted to save the current drawing settings
  translate(x, y); //to place it in center
  scale(0.235); //size of the face
  stroke(0);

  // face
  fill(224, 172, 105);
  strokeWeight(8);
  rect(-100, -100, 200, 200);

  // ears
  fill(224, 172, 105);
  rect(-120, -40, 20, 50);
  rect(100, -40, 20, 50);

  // eyebrows
  fill(90, 40, 0, 150);
  rect(-60, -80, 50, 50);
  rect(10, -80, 50, 50);

  // eyes white
  strokeWeight(4);
  fill(255);
  ellipse(-40, -10, 35, 35);
  ellipse(40, -10, 35, 35);

  // pupils
  fill(0);
  ellipse(-42, -8, 15, 15);
  ellipse(38, -8, 15, 15);

  // inner pupil white
  fill(255);
  ellipse(-45, -15, 7, 7);
  ellipse(35, -15, 7, 7);

  // mouth
  fill(220, 20, 60);
  strokeWeight(5);
  rect(-60, 10, 120, 70);

  pop(); //restore previous drawing settings
}

// CLICK FUNCTION
function mouseClicked() {
  let dinoX = x + 50; // reference point on dino
  let dinoY = y + 90; //to correspond the mouseclick

  // loop backwards so removing elements doesn't break the loop
  for (let i = faces.length - 1; i >= 0; i--) {
    let f = faces[i];

    //condition for hit ,if distance in x and y is small enough
    if (abs(dinoX - f.x) < 60 && abs(dinoY - f.y) < 60) {
      faces.splice(i, 1);
      score++; //score increases when face is eaten
    }
  }
}
