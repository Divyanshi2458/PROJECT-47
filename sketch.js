var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;
var fish,fish2,fishimg,fishimg2

function preload(){
  track = loadImage("images/Oceanbg.jpg");
  car1_img = loadImage("images/Surfer1.png");
  car2_img = loadImage("images/Surfer2.png");
  car3_img = loadImage("images/Surfer3.png");
  car4_img = loadImage("images/Surfer4.png");
  ground = loadImage("images/ground.png");
  fishimg=loadImage("images/Fishes 1.png")
fishimg2=loadImage("images/Fish 2.png")
}

function setup(){
  canvas = createCanvas(displayWidth - 100, displayHeight-100);
  
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  fishGroup=new Group ()
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
