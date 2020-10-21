var PLAY=1;
var END=0;
var gameState=1;
var ground;
var monkey , monkey_running;
var banana ,bananaImage, rock, rockImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,400);

 
   monkey= createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
   
    //moving ground 
  ground= createSprite(400,350,900,10);
  ground.x=ground.width /2;
   ground.velocityX=-4;
  console.log(ground.x);
 
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {

  background(255);
  
  
  textSize(20);
  fill("black");
  survivalTime=  Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,200,50); 
  
  monkey.setCollider("circle",0,0,260);
  //monkey.debug=true;
 
 if(ground.x>0){
   ground.x=ground.width /2;
 } 
  if(keyDown("space") && monkey.y>314){
    monkey.velocityY=-15;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
 
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    
  }
  
  if(gameState===END){
   FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityY=0;
    ground.velocityX=0;
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    survivalTime=0;
  }
  food();
  obstacles();
monkey.collide(ground);
drawSprites();  
  
  
  
}

function food(){
  
  if(frameCount%80===0){
    
    var banana= createSprite(450,20,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.y=Math.round(random(120,200     ));
    banana.lifetime=100;
    
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    
    FoodGroup.add(banana);
  }
}

function obstacles(){
  
  if(frameCount%300===0){
    
    var rock=createSprite(450,320,20,20);
    rock.addImage(rockImage);
    rock.scale=0.15;
    rock.velocityX=-4;
    rock.lifetime=100;
    
  obstacleGroup.add(rock);
    
  }
}


