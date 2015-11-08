var enemies = [];

var addEnemy = function(x, y){
  var enemy = fish(x,y);
  enemy.stage = LARVA;

  enemy.index = enemies.length;
  startAi(enemy);
  enemies.push(enemy);
};

var updateEnemies = function(modifier){

  for (var e in enemies)  updateEnemy(enemies[e], modifier);
};

var updateEnemy = function(fish, modifier){
  move(fish, modifier);
};

var startAi = function(enemy){
  setInterval(function(){
    changeDirection(enemy);

    var close = findCloseEnemy(enemy);


  }, 5000);
};

var findCloseEnemy = function(enemy) {
  var max = Math.max(enemy.index -2, 0);
  var min = Math.min(enemy.index +2, enemies.length);

  var index = randomBetween(max, min);
  return enemies[index];
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
