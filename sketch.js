var balloon, balloonImage1, balloonImage2;
// create database and position variable here
var database;
var position;
var topEdge, bottemEdge, leftEdge, rightEdge;

function preload() {
  bg = loadImage("cityImage.png");
  balloonImage1 = loadAnimation("hotairballoon1.png");
  balloonImage2 = loadAnimation("hotairballoon1.png", "hotairballoon1.png",
    "hotairballoon1.png", "hotairballoon2.png", "hotairballoon2.png",
    "hotairballoon2.png", "hotairballoon3.png", "hotairballoon3.png", "hotairballoon3.png");
}

//Function to set initial environment
function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1200, 600);

  balloon = createSprite(250, 450, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);

  topEdge = createSprite(0, 1, 3000, 5);
  bottemEdge = createSprite(0, 700, 3000, 5);
  leftEdge = createSprite(1500, 700, 5, 1500);
  rightEdge = createSprite(1, 300, 5, 1500)

}

// function to display UI
function draw() {
  background(bg);

  if (keyDown(LEFT_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2, balloonImage1);
    updatePosition(-10, 0);
  }
  else if (keyDown(RIGHT_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    updatePosition(10, 0);
  }
  else if (keyDown(UP_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    updatePosition(0, -10);
  }
  else if (keyDown(DOWN_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    updatePosition(0, 10);
  }

  if (balloon.isTouching(topEdge)) {
    balloon.collide(topEdge);
  }
  if (balloon.isTouching(bottemEdge)) {
    balloon.collide(bottemEdge);
  }
  if (balloon.isTouching(leftEdge)) {
    balloon.collide(leftEdge);
  }
  if (balloon.isTouching(rightEdge)) {
    balloon.collide(rightEdge);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!", 40, 40);

  fill(0);
  stroke("white");
  textSize(25);
  text("By SHUBHAM SM",1050,60)
}

function updatePosition(x, y) {
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError() {
  console.log("Error in writing to the database");
}
