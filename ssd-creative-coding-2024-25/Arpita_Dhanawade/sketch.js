let bump;

function setup() {
  soundFormats("mp3");
  bump = loadSound("Baby shark - Xylophone Cover.mp3");
  createCanvas(400, 400);
  background(0); // set background to black once at start
}

function mouseClicked() {
  bump.play();
}

function draw() {
  if (mouseIsPressed) fill(random(255), random(255), random(255), 150);
  noStroke();
  rect(mouseX, mouseY, 10, 20, 20,90);
}
