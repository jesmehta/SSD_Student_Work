let a,r,n;
let spirals = []; // for spirals
let bump; // for sound

function preload() 
{
  soundFormats("mp3");
  bump = loadSound("Kawaii Ringtones #6.mp3"); // to load the sound that runs when mousePressed with every spiral
}

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES); // for the angles of the spiral sin & cos
  //noStroke();
}

function draw() {
  background(10, 3); // for fading effect

  for (let i = 0; i < spirals.length; i++) {
    let s = spirals[i];

    s.a += 4; // for angle; when value increased, dist. btw. each line+dot increases
    let r = s.a * 0.2; // for radius; when value is decreased, space between each curve of spiral i.e. width decreases
    let x = s.x0 + r * cos(s.a); 
    let y = s.y0 + r * sin(s.a); // can change direction of the spiral by exchanging sin and cos; CLOCKWISE now

    let ns = noise(s.n) * 100; // for max. height of each line+dot
    s.n += 0.1;// when value decreased, variation in noise decreases

let c = s.baseColor;
stroke(c);
strokeWeight(s.strokeW);
fill(c);

    line(x, y, x, y - ns);

    // for a different shape based on Zone of click
    if (s.shape == "ellipse") {
      ellipse(x, y-ns, 7, 7);
    } else if (s.shape == "rect") {
      rect(x, y-ns, 8, 8);
    } else if (s.shape == "triangle") {
      triangle(x, y-ns, x-4, y-ns+7, x+4, y-ns+7); // from CHATGpt
    }
  }
}

function mousePressed() 
{
  let shapeType;
  let baseColor;
  let strokeW;

  if (mouseX < width / 2 && mouseY < height / 2) {
    shapeType = "ellipse";
    baseColor = color(0, 150, 255); // blue for ZONE-1, top-left
    strokeW = 0.3;
    
  } else if (mouseX >= width / 2 && mouseY < height / 2) {
    shapeType = "rect";
    baseColor = color(255, 100, 100); // red for ZONE-2, ttop-right
    strokeW = 2.5;
    
  } else if (mouseX < width / 2 && mouseY >= height / 2) {
    shapeType = "triangle";
    baseColor = color(100, 255, 150); // green for ZONE-4, bottom-left
    strokeW = 4;
    
  } else {
    shapeType = "ellipse";
    baseColor = color(255, 255, 100); // yellow for ZONE-3, bottom-right
    strokeW = 5.5;
  }

  spirals.push({ // to create a new spiral with all different properties and adds it to the SpirayArray
    x0: mouseX,
    y0: mouseY,
    a: 0,
    n: random(100),
    shape: shapeType,
    baseColor: baseColor,
    strokeW: strokeW
  });

  bump.play();
} 