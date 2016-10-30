var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
var colors = ["#1b85b8", "  #5a5255", "#559e83", "#ae5a41", "#c3cb71"]

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var color = updateColor()

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStlye = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function updateColor() {
  color = colors[Math.floor(Math.random()*colors.length)]
  return color;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  // reverse ball direction if hit it hits the side edges
  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
    color = updateColor();
  }
  // reverse ball direction if hit it hits the top/bottom edges
  if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
    color = updateColor();
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);