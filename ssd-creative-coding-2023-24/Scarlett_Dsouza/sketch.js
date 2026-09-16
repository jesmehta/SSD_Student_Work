let nx, ny, t;
let row, col, scl;
let nz;
let nStrength = 5;

function setup() {
  createCanvas(400, 400);
  nx = 0;
  ny = 0;
  t = 0.04;
  nz = 0;

  scl = 3;
  row = height / scl;
  col = width / scl;
  noStroke();
}

function draw() {
  background(0); 

  let shiftX= map(mouseX, 0, width, -1, 1);
  let shiftY = map(mouseY, 0, height, -1, 1);
  nx += shiftX * nStrength ;
  ny += shiftY * nStrength ;

  for (let j = 0; j < row; j++) {
    
    for (let i = 0; i < col; i++)
    {
      let k = noise(nx, ny, nz);
      
      let hue = map(k, 0, 1, mouseX, mouseX + 200);
      let saturation = map(nStrength, 0, 10, 100, 255);
      // the saturation is based on the strength of the noise 
      //with lower noise strengths resulting in lower saturation       //higher noise strengths resulting in higher saturation.
      let brightness = 255;
      fill(hue, saturation, brightness);

      let shift = map(k, 0, 1, -scl, scl);

      rect(i * scl + shift, j * scl + shift, scl + shift, scl + shift);
      nx += t;
    }
    nx = 0;
    ny += t;
  }
  ny = 0;
  nz += t;
}

function mousePressed() 
{
  // Increase noise strength when mouse is pressed
  nStrength += 1;
}


