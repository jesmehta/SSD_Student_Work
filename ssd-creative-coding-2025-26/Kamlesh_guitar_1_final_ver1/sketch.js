let img;
function preload() {
img = loadImage('guitar.png');
}

let strings = [ 150, 200, 250, 300,350];
let oscillators = []; // stores multiple sounds/oscillators at once 
let notes = [196, 220, 247, 262, 294, 330, 392]; //frequencies


function setup() {
  createCanvas(600, 400);  


 
  for (let i = 0; i < strings.length; i++) { //oscillates depending on string.length........
    let osc = new p5.Oscillator('triangle'); //generates sounds, also has multiple variations 
    let osc2 = new p5.Oscillator('sawtooth');
    

osc.start();    
osc2.start();
    
osc.amp(0);
osc2.amp(0);
    
    oscillators.push([osc, osc2]); // reads that string is plucked,and is vibrated...
  }
}

function draw() {
  //background(225);

  image(img,0,0.6);
  

  strokeWeight(3);

  for (let i = 0; i < strings.length; i++) { // loop increase +1 based on string length
    
   
    if (abs(mouseY - strings[i]) < 16) {      // the dist b/w mouse and string is less than 15 
      stroke('yellow');           //yellow mouse....
    } else {
      stroke(255);
    }

    
    line(0, strings[i], width, strings[i]); // x1 y1 x2 y2 values
  }

 
}


function mouseDragged() {

  for (let i = 0; i < strings.length; i++) {
    if (abs(mouseY - strings[i]) < 15) {
      


      let freq = notes[i] + random(-2, 2); //slighty randomizes the pitch 

      let osc = oscillators[i][0];
      let osc2 = oscillators[i][1];

      osc.freq(freq);
      osc2.freq(freq * 2 + 1);

     
      osc.amp(0.6, 0.002);
      osc2.amp(0.3, 0.002);

  
      osc.amp(0, 0.8);
      osc2.amp(0, 0.6);

  
     
   }
  }
}