/* Converted from Aadit Vanjari's Processing sketch. Serial directions are mapped to Arrow keys. */
let level=1, gameOver=false, cols, rows, cellSize, visited, walls;
let playerX, playerY, playerRadius, particles=[];
const playerSpeed=3;

function setup(){const canvas=createCanvas(800,600);canvas.parent("canvas-host");generateMaze();}
function draw(){
  background(255); drawMaze();
  if(!gameOver){movePlayer();drawPlayer();}else{drawExplosion();drawGameOver();}
  fill(0);noStroke();textAlign(LEFT,BASELINE);textSize(20);text(`Level: ${level}`,20,25);
  if(!gameOver){text("Arrow keys = Move",20,50);text("SPACE = New Maze",20,75);}
}
function generateMaze(){
  cols=min(8+level*2,39);rows=min(6+level*2,29);
  if(cols%2===0)cols++;if(rows%2===0)rows++;
  cellSize=min(width/cols,height/rows);playerRadius=cellSize*.275;
  visited=Array.from({length:cols},()=>Array(rows).fill(false));
  walls=Array.from({length:cols},()=>Array.from({length:rows},()=>[true,true,true,true]));
  carveMaze(0,0);playerX=cellSize/2;playerY=cellSize/2;
}
function carveMaze(x,y){
  visited[x][y]=true;const directions=shuffle([0,1,2,3],true);
  for(const direction of directions){
    let nx=x,ny=y;if(direction===0)ny--;if(direction===1)nx++;if(direction===2)ny++;if(direction===3)nx--;
    if(nx>=0&&nx<cols&&ny>=0&&ny<rows&&!visited[nx][ny]){
      walls[x][y][direction]=false;walls[nx][ny][(direction+2)%4]=false;carveMaze(nx,ny);
    }
  }
}
function drawMaze(){
  stroke(0);strokeWeight(2);
  for(let x=0;x<cols;x++)for(let y=0;y<rows;y++){
    const px=x*cellSize,py=y*cellSize;
    if(x===0&&y===0){fill(100,220,100);noStroke();rect(px,py,cellSize,cellSize);stroke(0);}
    if(x===cols-1&&y===rows-1){fill(255,100,100);noStroke();rect(px,py,cellSize,cellSize);stroke(0);}
    const w=walls[x][y];if(w[0])line(px,py,px+cellSize,py);if(w[1])line(px+cellSize,py,px+cellSize,py+cellSize);if(w[2])line(px,py+cellSize,px+cellSize,py+cellSize);if(w[3])line(px,py,px,py+cellSize);
  }
}
function activeDirection(){
  if(keyIsDown(UP_ARROW))return"UP";if(keyIsDown(DOWN_ARROW))return"DOWN";if(keyIsDown(LEFT_ARROW))return"LEFT";if(keyIsDown(RIGHT_ARROW))return"RIGHT";return"STOP";
}
function movePlayer(){
  const direction=activeDirection();if(direction==="STOP")return;
  let nextX=playerX,nextY=playerY;if(direction==="UP")nextY-=playerSpeed;if(direction==="DOWN")nextY+=playerSpeed;if(direction==="LEFT")nextX-=playerSpeed;if(direction==="RIGHT")nextX+=playerSpeed;
  if(collidesWithWall(nextX,nextY)){triggerGameOver();return;}
  playerX=nextX;playerY=nextY;
  const finishX=(cols-1)*cellSize+cellSize/2,finishY=(rows-1)*cellSize+cellSize/2;
  if(dist(playerX,playerY,finishX,finishY)<cellSize*.35){level++;generateMaze();}
}
function collidesWithWall(x,y){
  const cellX=floor(x/cellSize),cellY=floor(y/cellSize);if(cellX<0||cellX>=cols||cellY<0||cellY>=rows)return true;
  const left=cellX*cellSize,right=left+cellSize,top=cellY*cellSize,bottom=top+cellSize,w=walls[cellX][cellY];
  return (w[0]&&y-playerRadius<=top)||(w[1]&&x+playerRadius>=right)||(w[2]&&y+playerRadius>=bottom)||(w[3]&&x-playerRadius<=left);
}
function drawPlayer(){fill(0,100,255);noStroke();circle(playerX,playerY,playerRadius*2);}
function triggerGameOver(){gameOver=true;particles=Array.from({length:35},()=>new Particle(playerX,playerY));}
function drawExplosion(){particles.forEach(p=>{p.update();p.display();});}
function drawGameOver(){fill(0,180);noStroke();rect(0,0,width,height);fill(255);textAlign(CENTER,CENTER);textSize(60);text("GAME OVER",width/2,height/2-40);textSize(24);text("Press ENTER to restart",width/2,height/2+30);}
function keyPressed(){
  if(gameOver&&(keyCode===ENTER||keyCode===RETURN)){level=1;gameOver=false;particles=[];generateMaze();return false;}
  if(!gameOver&&key===" "){level++;generateMaze();return false;}
  if([UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW].includes(keyCode))return false;
}
function keyReleased(){if([UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW].includes(keyCode))return false;}
class Particle{
  constructor(x,y){this.x=x;this.y=y;const angle=random(TWO_PI),force=random(2,7);this.vx=cos(angle)*force;this.vy=sin(angle)*force;this.size=random(5,12);this.life=255;}
  update(){this.x+=this.vx;this.y+=this.vy;this.vy+=.08;this.vx*=.99;this.vy*=.99;this.life-=4;}
  display(){noStroke();fill(0,this.life);circle(this.x,this.y,this.size);}
}
