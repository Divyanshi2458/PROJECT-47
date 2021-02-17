class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car1.scale=0.7
    car2 = createSprite(100,300);
    car2.addImage("car2",car2_img);
    car2.scale=0.5
    car3 = createSprite(100,500);
    car3.addImage("car3",car3_img);
    car4 = createSprite(100,700);
    car4.addImage("car4",car4_img);
    car4.scale=0.5
    cars = [car1, car2, car3, car4];
  }

  play(){

    form.hide();
    
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, -displayWidth*4,0,displayWidth*5, displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x ;
      var y=170;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        x = 500-   allPlayers[plr].distance;
        //position the cars a little away from each other in x direction
        y = y+ 200;
        //use data form the database to display the cars in y direction
        
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
        fill ("yellow")
        ellipse(x,y,80,80)
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = displayHeight/2
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if (frameCount % 20 === 0) {
      fish = createSprite(displayWidth,random(100, 1000), 100, 100);
      fish.velocityX = 6;
      var rand = Math.round(random(1,2));
      switch(rand){
          case 1: fish.addImage("Fishes 1",fishimg);
          break;
          case 2: fish.addImage("Fish 2", fishimg2);
          break;
       
      }
      fishGroup.add(fish);
      
  }

  if (player.index !== null) {
    //fill code here, to destroy the objects. (Use the one in the class project 39)
    // add the condition to calculate the score. and use update ti update the values in the database.
    for(var i=0;i< fishGroup.length;i++){
        if(fishGroup.get(i).isTouching(cars)){
        
      gameState=2
            player.update()

        }
    }
 }

    
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
    
   
  
  }
}
