var enemies = [];

var addEnemy = function(x, y){
  var enemy = fish(x,y);
  enemy.stage = LARVA;

  startAi(enemy);
  enemies.push(enemy);
};

var updateEnemies = function(modifier){

  for (var i= 0; i < enemies.length; i++){
    var enemy = enemies[i];
  /*  if (isCollidingBlocks(enemy,enemy.direction)){
      changeDirection(enemy);

    } else {*/
      enemy.secondsAlive += modifier;


      move(enemy, modifier);
      enemy.grow();
    //}
  }
}

setInterval(function(){
  for (var i in enemies){
    enemy = enemies[i];
  }
}, 1000);

var startAi = function(enemy){
  setInterval(function(){
    changeDirection(enemy);
  }, 5000);
};



var changeDirection = function(enemy){
    var tol =  p(-5,0);
    var randomDirection = randomBetween(0, 3);
    switch(randomDirection){
      case 0: enemy.direction = LEFT;break;
      case 1: enemy.direction = RIGHT;break;
      case 2: enemy.direction = UP;break;
      default: enemy.direction = DOWN;break;
    }
}
