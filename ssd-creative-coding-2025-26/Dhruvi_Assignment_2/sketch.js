let myPicker;
let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10;
let sizeSlider;
let brushButton;
let eraserButton;
let saveButton;
let clearButton;
let startButton;

let currentMode = "brush"; // Can be 'brush', 'eraser', or 'letter'

function preload() 
{
  // Loading a random placeholder image.
  img1 = loadImage("cat.jpg");
  img2 = loadImage("girll.jpg");
  img3 = loadImage("cherry.jpg");
  img4 = loadImage("nutella.JPG");
  img5 = loadImage("zeal.JPG");
  img6 = loadImage("nishu.JPG");
  img7 = loadImage("stars.png");
  img8 = loadImage("butterfly.png");
  img9 = loadImage("butterfly.png");
  img10 = loadImage("butterfly.png");
  img11 = loadImage("paw.png");
  img12 = loadImage("paw.png");
  img13 = loadImage("bow.png");
}

function setup() 
{
  createCanvas(1000, 1000);

  // Draw start page
  background(188, 175, 233); // Cute soft pastel purple
  textSize(65);
  textAlign(CENTER, CENTER);
  fill(60, 42, 125);
  stroke(0.5);
  textFont("Rubik Spray Paint"); // Use the name from the Google Font link
  text("BEANEE'S COLOURING BOOK ", width / 2, height / 2 - 300);

  // Add rectangles as base of polaroid.
  angleMode(DEGREES);
  push(); // Save the current state of the canvas
  fill(255);
  translate(0, 0); // Move the origin (0,0) to where we want the rectangle
  rotate(15);

  rect(120, 320, 160, 260, 10);
  pop();

  push();
  fill(255);
  rotate(-30);
  rect(520, 720, 160, 260, 10);
  pop();

  push();
  fill(255);
  rotate(-15);
  rect(320, 720, 160, 260, 10);
  pop();

  // Add images to complete the polaroids.
  push(); // Save the state again
  translate(0, 0); // Move the origin (0,0) to where we want the image
  rotate(15); // Rotate the canvas backwardsas fast
  image(img4, 135, 340, 130, 160);
  pop();

  push();
  rotate(-30);
  image(img5, 530, 740, 140, 160);
  pop();

  push();
  rotate(-15);
  image(img6, 330, 740, 140, 160);
  pop();

  // Add stickers to make it more decorative.
  image(img7, 100, 830, 100, 100);
  image(img7, 200, 480, 200, 200);
  image(img7, 650, 250, 200, 200);
  image(img8, 200, 750, 150, 150);
  image(img9, 760, 500, 200, 200);
  image(img13, 700, 20, 150, 150);
  image(img13, 30, 525, 150, 150);
  image(img13, 600, 750, 150, 150);
  push();
  rotate(-15);
  image(img10, 20, 50, 150, 150);
  pop();
  image(img11, 10, 300, 80, 80);

  //Make the press button.
  fill(191, 233, 175);

  startButton = createButton("Press to start", "60");
  startButton.style("font-size", "30px");
  startButton.style("background-color", "#BFE9AF");
  startButton.size(300, 70);
  startButton.position(350, 400);
  startButton.mousePressed(loadDrawingBoard);
}

function draw()
{
  if (
    myPicker &&
    mouseIsPressed &&
    mouseX >= 200 &&
    mouseX <= 800 &&
    mouseY >= 200 &&
    mouseY <= 950
  )
  {
    if (currentMode === "brush") {
      stroke(myPicker.color());
      strokeWeight(sizeSlider.value() / 5); // Normal brush thickness
      line(pmouseX, pmouseY, mouseX, mouseY);
    } else if (currentMode === "eraser") {
      stroke(254, 254, 254);
      strokeWeight(sizeSlider.value() / 5);
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
}

// Call the image selected.
function selImage(selectedImage) {
  imageMode(CENTER);
  image(selectedImage, 500, 550, 600, 800);
}

function clearCanvas() {
  background(230, 230, 250);
}

function saveDrawing() {
  saveCanvas("my_painting", "png");
}

function loadDrawingBoard() {
  startButton.hide(); //  Hides the start button
  clearCanvas(); // Paints over the intro text with your fresh background color

  // Create a button and place it beneath the canvas.
  let button1 = createButton("Cat claw machine");
  button1.style("background-color", "#BFE9AF");
  button1.size(150, 50);
  button1.position(20, 20);

  let button2 = createButton("A girl");
  button2.style("background-color", "#BFE9AF");
  button2.size(150, 50);
  button2.position(180, 20);

  let button3 = createButton("Retro cherry");
  button3.style("background-color", "#BFE9AF");
  button3.size(150, 50);
  button3.position(340, 20);

  // Create a colorPicker and place it besides.
  myPicker = createColorPicker("black");
  myPicker.size(70, 50);
  myPicker.position(590, 20);

  // Increased max size for better letter visibility
  sizeSlider = createSlider(10, 150, 40);
  sizeSlider.position(670, 20);

  brushButton = createButton("Brush");
  brushButton.size(55, 25);
  brushButton.position(670, 45);
  brushButton.mousePressed(() => (currentMode = "brush"));

  eraserButton = createButton("Eraser");
  eraserButton.size(55, 25);
  eraserButton.position(735, 45);
  eraserButton.mousePressed(() => (currentMode = "eraser"));

  clearButton = createButton("Clear Canvas");
  clearButton.size(170, 25);
  clearButton.position(810, 20);
  clearButton.mousePressed(clearCanvas);

  saveButton = createButton(" Save Artwork");
  saveButton.size(170, 22);
  saveButton.position(810, 50);
  saveButton.mousePressed(saveDrawing);

  // Call selImage() when the button is pressed.
  imageMode(CENTER);
  button1.mousePressed(() => selImage(img1));
  button2.mousePressed(() => selImage(img2));
  button3.mousePressed(() => selImage(img3));
}
