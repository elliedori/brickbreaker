var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
// var colors = ["#1b85b8", "  #5a5255", "#559e83", "#ae5a41", "#c3cb71"]

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
// var color = updateColor();

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for (var r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function moveBall() {
  // reverse ball direction if hit it hits the side edges
  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
    // color = updateColor();
  }
  // reverse ball direction if hit it hits the top/bottom edges
  if (y + dy < ballRadius) {
    dy = -dy;
  } 
  else if (y + dy > canvas.height-ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      alert("GAME OVER");
      document.location.reload();
    }
  }

  x += dx;
  y += dy;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStlye = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c=0; c<brickColumnCount; c++) {
    for (var r=0; r<brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
      var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
      var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
      }
    }
  }
}

function updateColor() {
  color = colors[Math.floor(Math.random()*colors.length)]
  return color;
}

function movePaddle() {
  if (rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

function collisionDetection() {
  for (var c=0; c<brickColumnCount; c++) {
    for (var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
        dy = -dy;
        b.status = 0;
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  moveBall();
  movePaddle();
  collisionDetection();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  }
  else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  }
  else if (e.keyCode ==37) {
    leftPressed = false;
  }
}

setInterval(draw, 10);







