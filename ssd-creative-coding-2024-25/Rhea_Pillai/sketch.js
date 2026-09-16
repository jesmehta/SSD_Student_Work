let dots = [];

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  noStroke();
  
  for (let i = 0; i < 10; i++) {
    let angle = random(TWO_PI);
    let dist = random(50, 150);
    let x = cos(angle) * dist;
    let y = sin(angle) * dist;
    dots.push(createVector(x, y));
  }
}

function draw() {
  background(0, 0.1);
  translate(width / 2, height / 2);
 let repeats = 6;

  for (let i = 0; i < repeats; i++) {
    rotate(TWO_PI / repeats);


    for (let dot of dots) {
for (let dot of dots) {
  let hueColor = random([140, 200]);  // emerald green or light blue
  fill(hueColor, 60, 95, 0.6);        // high brightness, softer tone

}


      dot.x += (mouseX - width / 2 - dot.x) * 0.02;
      dot.y += (mouseY - height / 2 - dot.y) * 0.02;
      circle(dot.x, dot.y, 8);
    }
  }
} 