var enemies = [];

HUNGRY_THRESHOLD= 50;
ENEMY_DISTANCE = 500;

var addEnemy = function(x, y){
  var enemy = fish(x,y);
  enemy.stage = LARVA;

  enemy.type = ENEMY;
  enemy.index = enemies.length;
  enemy.following = -1;

  startAi(enemy);
  enemies.push(enemy);
};

var updateEnemies = function(modifier){

  for (var e in enemies) {
    var enemy = enemies[e];

    enemy.index = e; //Update index as enemies can be removed from list

    if (enemy.stage == DEAD) enemies.splice(e,1);
    else updateEnemy(enemy, modifier);
  }
};



var updateEnemy = function(fish, modifier){

  if (fish.following < 0 && fish.food < HUNGRY_THRESHOLD){
    var close = findCloseEnemy(fish);
    fish.following = close.index;
    //console.log("Enemy " , fish, " following " , close);
  }

  if (fish.following > enemies.length || //Target is dead
    fish.following == fish.index) { //Race condition
      fish.following = -1;
  }

  if (fish.following >= 0) fish.follow(enemies[fish.following], modifier);
  else move(fish, modifier);

};

var startAi = function(enemy){
  setInterval(function(){

    /*enemy = enemies[enemy.index];
    else {
      changeDirection(enemy);
    }*/

  }, 5000);
};

var findCloseEnemy = function(enemy) {
  var max = Math.max(enemy.index -5, 0);
  var min = Math.min(enemy.index +5, enemies.length);

  var index = randomBetween(max, min);
  if (enemy.index == index || !enemies[index]) return findCloseEnemy(enemy); //Try again
  else return enemies[index];
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
};
