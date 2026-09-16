let bullets =[]
function setup() {
  createCanvas(600, 600);
  color(RGB)
}

function draw() {
  background(0,10);
  rect(mouseX, height - 60,55)
  fill(256,200,350)
 
  for (let bullet of bullets){
    rect(bullet.x, bullet.y, 20)
    bullet.y -= 10
  }
}
function mousePressed(){
  let bullet = {
    x: mouseX,
    y: height -50
  }
  bullets .push(bullet)
}
// player to move on x axis 
// bullets spam on click 
