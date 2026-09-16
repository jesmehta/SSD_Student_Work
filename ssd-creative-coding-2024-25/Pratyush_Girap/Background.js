function drawTable(x, y) {
  push();
  translate(x, y);
  rect(0, 0, 150, 15);
  rect(8, 15, 134, 10);
  rect(8, 25, 12, 60);
  rect(130, 25, 12, 60);
  triangle(20, 25, 20, 40, 40, 25);
  triangle(130, 25, 130, 40, 108, 25);
  noStroke();
  fill(63, 40, 22, 170);
  triangle(20, 25, 20, 40, 40, 25);
  triangle(130, 25, 130, 40, 108, 25);
  rect(0, 10, 150, 5);
  rect(8, 15, 134, 4);
  rect(8, 25, 12, 15);
  rect(130, 25, 12, 15);
  pop();
}

function drawChair(x, y, side) {
  push();
  translate(x, y);
  if (side == 1) {
    rect(0, 15, 12, 40);
    rect(63, -60, 12, 115);
  } else {
    rect(0, -60, 12, 115);
    rect(63, 15, 12, 40);
  }
  rect(0, 0, 75, 15);
  noStroke();
  fill(63, 40, 22, 170);
  rect(0, 10, 75, 5);
  rect(0, 15, 12, 10);
  rect(63, 15, 12, 10);
  pop();
}

function drawShelf(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(70, 70, 57, 170);
  rect(145, 0, 10, 200, 5);
  stroke(0);
  fill(255);
  strokeWeight(2);
  rect(10, 0, 130, 200);
  rect(0, 0, 150, 15, 5);
  rect(10, 66, 130, 13);
  rect(10, 132, 130, 13);
  rect(10, 193, 130, 13);
  rect(5, 15, 10, 200);
  rect(135, 15, 10, 200);
  drawBook1(16, 26, 15, 40, 1);
  drawBook1(32, 31, 15, 35, 1);
  drawBook1(115, 26, 15, 40, "R");
  drawBook1(95, 92, 15, 40, "R");
  drawBook1(80, 102, 13, 30, "R");
  drawBook1(67, 97, 13, 35, "R");
  drawBook2(115, 32, 35, 10, "R");
  drawBook1(53, 153, 15, 40, 1);
  drawBook1(40, 163, 13, 30, 1);
  drawBook1(15, 158, 13, 35, 1);

  noStroke();
  fill(63, 40, 22, 170);
  rect(0, 10, 150, 5, 5);
  rect(13, 74, 123, 4);
  rect(13, 140, 123, 4);
  rect(13, 201, 123, 4);
  rect(11, 15, 4, 200);
  rect(135, 15, 4, 200);

  pop();
}

function drawBook2(x, y, w, h, sde) {
  push();
  translate(x, y);
  rotate(108);
  rect(0, 0, w, h);
  rect(0 + (w / 4), 0, w / 4, h);

  noStroke();
  fill(63, 40, 22, 170);

  if (sde == "R") {
    rect(0, 0, w, h * 0.4);
  } else {
    rect(w, 0, w, h * 0.4);
  }

  pop();
}

function drawBook1(x, y, w, h, sde) {
  push();
  rect(x, y, w, h);
  rect(x, y + (h / 4), w, h / 4);
  noStroke();
  fill(63, 40, 22, 170);
  if (sde == "R") {
    rect(x + w - w * 0.4, y, w * 0.4, h);
  } else {
    rect(x, y, w * 0.4, h);
  }
  pop();
}

function drawWindow(x, y) {
  push();
  translate(x, y);
  rect(10, 0, 130, 135);
  fill(0);
  rect(25, 15, 100, 105);
  fill(255);
  rect(70, 15, 10, 105);
  rect(25, 65, 100, 10);

  noStroke();
  fill(63, 40, 22, 170);
  rect(70, 15, 10, 10);
  rect(70, 75, 10, 10);
  fill(70, 70, 57, 170);
  rect(140, 0, 10, 135);
  pop();
}

function drawDoor(x, y) {
  push();
  translate(x, y);
  rect(0, 0, 150, 220);
  rect(10, 10, 130, 210);
  line(75, 10, 75, 230);
  line(40, 10, 40, 230);
  line(110, 10, 110, 230);

  noStroke();
  fill(63, 40, 22, 170);
  rect(10, 10, 7, 210);
  rect(10, 10, 130, 7);
  circle(27, 144, 18);

  stroke(0);
  fill(255);
  strokeWeight(2);
  circle(24, 140, 15);

  noStroke();
  fill(70, 70, 57, 170);
  rect(150, 0, 10, 220);

  pop();
}

function drawSofa(x, y) {
  push();
  translate(x, y);
  rect(10, -60, 90, 90, 20);
  rect(100, -60, 90, 90, 20);
  rect(0, 10, 200, 20, 5);
  rect(0, 23, 200, 15);
  rect(0, -30, 30, 70, 5);
  rect(170, -30, 30, 70, 5);
  rect(7.5, 40, 15, 10);
  rect(177.5, 40, 15, 10);

  noStroke();
  rect(31, 11, 138, 20);
  fill(70, 70, 57, 170);
  rect(30, 31, 140, 7);
  rect(7.5, 40, 15, 5);
  rect(177.5, 40, 15, 5);
  rect(0, 35, 30, 5);
  rect(170, 35, 30, 5);

  rect(200, -35, 10, 75);
  rect(190, -35, 10, 5);
  rect(193, 40, 7, 15);
  rect(22.5, 40, 7, 15);

  pop();
}

function drawEndTable(x, y) {
  push();
  translate(x, y);
  rect(0, 0, 80, 13);
  rect(8, 13, 64, 10);
  rect(8, 23, 10, 40);
  rect(62, 23, 10, 40);
  rect(18, 23, 44, 25);
  rect(18, 48, 44, 5);

  noStroke();
  fill(63, 40, 22, 170);
  rect(0, 7, 80, 5);
  rect(8, 13, 64, 4);
  rect(18, 45, 44, 3);
  rect(18, 23, 44, 5);
  circle(43, 37, 11);
  fill(70, 70, 57, 170);
  rect(70,12,10,50)
  rect(17,53,10,7)

  stroke(0);
  fill(255);
  strokeWeight(2);
  circle(41,35,10);
  pop()
}