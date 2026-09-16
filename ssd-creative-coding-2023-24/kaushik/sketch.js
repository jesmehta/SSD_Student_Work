let bubbles = [];
let emojis = ["😊", "🤦‍♂", "🤷‍♀", "😡","🤞","🎶","🥶","🥳","🤖"];

function setup() {
  createCanvas(500, 500);
}

function draw() {
 //background(0);

  for (let bubble of bubbles) {
    bubble.display();
    bubble.update();
  }
}

class Bubble {
  constructor(x, y, emoji) {
    this.x = x;
    this.y = y;
    this.emoji = emoji;
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }
  
  display() {
    textSize(40);
    text(this.emoji, this.x, this.y);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }
}

function mousePressed() {
  // Randomly select an emoji from the emojis array
  let randomEmoji = random(emojis);
  let bubble = new Bubble(mouseX, mouseY, randomEmoji);
  bubbles.push(bubble);
  
  let randomColor = color(random(255), random(255), random(255));
  background(randomColor);
}

function keyTyped()
{
  if(key === 's')
  {
   saveCanvas("SketchName" + frameCount + ".jpg");
  print("file saved");
  }
  return false;
}
