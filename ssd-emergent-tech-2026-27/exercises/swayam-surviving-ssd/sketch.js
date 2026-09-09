const A='assets/';
let bg,degree,missileImg,startButton,players=[],special={};
let audio={},screen='start',playerX=300,playerY=300,kt=0,startTime=0,finalTime=0;
let missiles=[],missileSpeed=3,spawnInterval=1000,lastSpawn=0,difficulty=1;
let hitBlink=0,greenBlink=0,pmRolled=false,specials=[];
const MAX_KT=6,DEGREE_TIME=60;

function preload(){
  bg=loadImage(A+'BG.webp'); degree=loadImage(A+'degree.webp'); missileImg=loadImage(A+'missile.webp'); startButton=loadImage(A+'StartButton.webp');
  for(let i=1;i<=6;i++)players.push(loadImage(A+`player${i}.png`));
  special.mo=loadImage(A+'specialCharacter.png'); special.vk=loadImage(A+'character8.png'); special.pm=loadImage(A+'character9.png');
}
function setup(){const status=document.getElementById('boot-status');if(status)status.remove();const canvas=createCanvas(600,600);canvas.parent('canvas-host');canvas.mousePressed(()=>{if(screen!=='play')advance()});window.addEventListener('keydown',event=>{if((event.code==='Space'||event.code==='Enter')&&!event.repeat&&screen!=='play'){event.preventDefault();advance()}});frameRate(60);textFont('SSDPixel, monospace');imageMode(CORNER);audio={click:createAudioClip('ClickSound.mp3'),defeat:createAudioClip('DefeateSound.mp3'),victory:createAudioClip('VictoryDrumRollSound.mp3'),green:createAudioClip('GreenBlinkSound.mp3'),hit:createAudioClip('HitSound.mp3'),bg:createAudioClip('BGSound.mp3',true),angle:createAudioClip('AngleSound.mp3')}}
function createAudioClip(file,loop=false){const a=new Audio(A+file);a.preload='auto';a.loop=loop;return a}
function play(name,restart=true){const a=audio[name];if(!a)return;if(restart)a.currentTime=0;a.play().catch(()=>{})}
function stop(name){const a=audio[name];if(a){a.pause();a.currentTime=0}}
function draw(){if(screen==='play')drawGame();else if(screen==='win')drawWin();else if(screen==='over')drawOver();else drawIntro()}
function backdrop(dim=0){image(bg,0,0,width,height);if(dim){fill(0,dim);noStroke();rect(0,0,width,height)}}
function drawIntro(){
  if(screen==='start'){backdrop(155);center('Surviving SSD',180,58,255);imageMode(CENTER);image(startButton,width/2,350,230,230*startButton.height/startButton.width);imageMode(CORNER);center('Press Space to continue',470,17,255);return}
  background(0);
  if(screen==='disclaimer'){center('DISCLAIMER',100,30,color(255,0,0));['No real humans were used or harmed','in the game. Any resemblance to real','people is unintended. Every character is','fictional and used for game mechanics','and entertainment.'].forEach((t,i)=>center(t,235+i*30,19,255));prompt();return}
  const data=screen==='mo'?['CHARACTER 07','When she appears…',special.mo,'Submit K.T','Meeting her removes 1 K.T.']:screen==='vk'?['CHARACTER 08','When she appears…',special.vk,'Meet me in 519','Reach her before she disappears.']:['CHARACTER 09','When she appears…',special.pm,'Meet me','Meeting her clears every K.T.'];
  center(data[0],65,16,150);center(data[1],120,42,255);imageMode(CENTER);image(data[2],width/2,245,120,135);imageMode(CORNER);center(data[3],370,30,color(255,0,0));center(data[4],440,18,220);prompt();
}
function prompt(){center('PRESS SPACE TO CONTINUE',540,15,120)}
function center(t,y,size,c){fill(c);noStroke();textAlign(CENTER,CENTER);textSize(size);text(t,width/2,y)}
function advance(){play('click');if(screen==='start')screen='disclaimer';else if(screen==='disclaimer')screen='mo';else if(screen==='mo')screen='vk';else if(screen==='vk')screen='pm';else if(screen==='pm')beginGame();else if(screen==='win'||screen==='over')resetToStart()}
function beginGame(){screen='play';kt=0;playerX=playerY=width/2;missiles=[];missileSpeed=3;spawnInterval=1000;difficulty=1;startTime=millis();lastSpawn=millis();hitBlink=greenBlink=0;pmRolled=false;specials=[];stop('victory');stop('defeat');stop('angle');play('bg',false);schedule('mo');schedule('vk')}
function resetToStart(){['bg','victory','defeat','angle'].forEach(stop);screen='start';kt=0;missiles=[];specials=[]}
function drawGame(){backdrop();const elapsed=(millis()-startTime)/1000;if(elapsed>=56&&audio.bg&&!audio.bg.paused)stop('bg');if(elapsed>=56&&audio.victory.paused)play('victory');if(elapsed>=DEGREE_TIME)return win();movePlayer();updateDifficulty(elapsed);updateSpecials(elapsed);if(millis()-lastSpawn>=spawnInterval){missiles.push(new Missile(elapsed));lastSpawn=millis()}for(let i=missiles.length-1;i>=0;i--){const m=missiles[i];m.update(elapsed);m.draw();if(m.hit()){missiles.splice(i,1);play('hit');addKT();if(screen==='over')return}else if(m.out())missiles.splice(i,1)}drawSpecials();drawPlayer();drawHUD(elapsed);drawBlinks();if(elapsed>=25&&elapsed<30&&floor(millis()/300)%2===0){center('WARNING!',110,30,color(255,0,0));center("It's Jury time",145,24,color(255,0,0))}if(elapsed>=30&&elapsed<40){fill(0,190);rect(15,95,145,35,6);fill(255,0,0);textAlign(LEFT,BASELINE);textSize(20);text('CHASE MODE',20,120)}}
function movePlayer(){if(keyIsDown(LEFT_ARROW))playerX-=4;if(keyIsDown(RIGHT_ARROW))playerX+=4;if(keyIsDown(UP_ARROW))playerY-=4;if(keyIsDown(DOWN_ARROW))playerY+=4;const hw=kt>=5?40:40,hh=kt>=5?55:40;playerX=constrain(playerX,hw,width-hw);playerY=constrain(playerY,hh,height-hh)}
function updateDifficulty(e){difficulty=e<30?floor(e/10)+1:floor((e-30)/8)+4;missileSpeed=3+(difficulty-1)*.55;spawnInterval=max(250,1000-(difficulty-1)*100)}
function addKT(){if(screen!=='play')return;kt=min(MAX_KT,kt+1);hitBlink=millis();greenBlink=0;if(kt>=MAX_KT){finalTime=(millis()-startTime)/1000;screen='over';stop('bg');stop('angle');stop('victory');play('defeat');missiles=[];specials=[]}}
function removeKT(all=false){if(screen!=='play')return;kt=all?0:max(0,kt-1);greenBlink=millis();hitBlink=0;play('green')}
function schedule(type){specials.push({type,state:'waiting',due:millis()+random(5000,10001)})}
function activate(s){s.state='active';s.born=millis();s.x=random(90,width-90);s.y=random(120,height-80);if(s.type==='pm')play('angle')}
function updateSpecials(elapsed){if(elapsed<40){for(const type of ['mo','vk'])if(!specials.some(s=>s.type===type))schedule(type)}if(elapsed>=40&&elapsed<50&&!pmRolled){pmRolled=true;if(random(100)<10)specials.push({type:'pm',state:'active',born:millis(),x:random(90,width-90),y:random(120,height-80)}),play('angle')}for(let i=specials.length-1;i>=0;i--){const s=specials[i];if(s.state==='waiting'&&millis()>=s.due)activate(s);if(s.state!=='active')continue;if(dist(playerX,playerY,s.x,s.y)<=70){if(s.type==='mo')removeKT();else if(s.type==='pm'){removeKT(true);stop('angle')}else{greenBlink=millis();play('green')}specials.splice(i,1);continue}if(millis()-s.born>=3000){if(s.type==='vk')addKT();if(s.type==='pm')stop('angle');specials.splice(i,1)}}}
function alphaFor(age){if(age<700)return map(age,0,700,0,255);const phase=floor((age-(3000-1000))/250);return age<2000||phase%2===0?255:0}
function drawSpecials(){for(const s of specials){if(s.state!=='active')continue;const a=alphaFor(millis()-s.born),img=special[s.type];imageMode(CENTER);tint(255,a);image(img,s.x,s.y,80,90);noTint();imageMode(CORNER);dialogue(s.x,s.y,s.type==='mo'?'Submit K.T':s.type==='vk'?'Meet me in 519':'Meet me',a)}}
function dialogue(x,y,t,a){rectMode(CENTER);fill(255,a);stroke(0,a);strokeWeight(2);rect(x,y-70,190,50,8);fill(0,a);noStroke();textAlign(CENTER,CENTER);textSize(19);text(t,x,y-70);rectMode(CORNER)}
function currentPlayer(){return players[kt===0?5:kt===1?4:kt===2?3:kt===3?2:kt===4?1:0]}
function drawPlayer(tintColor=null){imageMode(CENTER);if(tintColor)tint(...tintColor);image(currentPlayer(),playerX,playerY,80,kt>=5?110:80);noTint();imageMode(CORNER)}
function drawBlinks(){if(hitBlink&&millis()-hitBlink<480&&floor((millis()-hitBlink)/120)%2===0)drawPlayer([255,0,0]);if(greenBlink&&millis()-greenBlink<480&&floor((millis()-greenBlink)/120)%2===0)drawPlayer([0,255,0])}
function drawHUD(e){fill(0,170);noStroke();rect(10,8,150,85);fill(255);textAlign(LEFT,BASELINE);textSize(20);text(`Time: ${floor(e)} sec`,20,30);text(`KT: ${kt} / ${MAX_KT}`,20,55);text(`Level: ${difficulty}`,20,80)}
function win(){screen='win';finalTime=DEGREE_TIME;stop('bg');stop('angle');missiles=[];specials=[]}
function drawWin(){background(0);imageMode(CENTER);const sc=min(500/degree.width,500/degree.height);image(degree,width/2,height/2,degree.width*sc,degree.height*sc);imageMode(CORNER);center('Press Space to play again',570,14,180)}
function drawOver(){background(0);center('SSD // ACADEMIC STATUS',55,15,130);center('Golden K.T',125,54,color(255,0,0));stroke(255,0,0);line(100,170,500,170);center('YOU FAILED',225,34,color(255,0,0));center(String(kt),290,60,color(255,0,0));center('SUBJECTS',330,20,220);center('in SSD',375,25,color(255,0,0));center('SURVIVAL',425,18,190);center(`${min(8,floor(finalTime/(DEGREE_TIME/8)))} SEMESTERS`,460,27,255);center('Press Space to pay your fees again',535,18,color(255,0,0))}

class Missile{constructor(elapsed){const side=floor(random(4));if(side===0){this.x=random(width);this.y=-100}else if(side===1){this.x=width+100;this.y=random(height)}else if(side===2){this.x=random(width);this.y=height+100}else{this.x=-100;this.y=random(height)}const a=atan2(playerY-this.y,playerX-this.x);this.vx=cos(a)*missileSpeed;this.vy=sin(a)*missileSpeed;this.chasing=elapsed>=30&&elapsed<40}update(elapsed){this.chasing=elapsed>=30&&elapsed<40;if(this.chasing){const dx=playerX-this.x,dy=playerY-this.y,d=sqrt(dx*dx+dy*dy);if(d){this.vx=lerp(this.vx,dx/d*missileSpeed*.35,.025);this.vy=lerp(this.vy,dy/d*missileSpeed*.35,.025)}}else{const s=sqrt(this.vx*this.vx+this.vy*this.vy);if(s){this.vx=this.vx/s*missileSpeed;this.vy=this.vy/s*missileSpeed}}this.x+=this.vx;this.y+=this.vy}draw(){push();translate(this.x,this.y);rotate(atan2(this.vy,this.vx)+PI);imageMode(CENTER);image(missileImg,0,0,100,60);pop();imageMode(CORNER)}hit(){return dist(this.x,this.y,playerX,playerY)<(kt>=5?65:60)}out(){return this.x<-200||this.x>width+200||this.y<-200||this.y>height+200}}
