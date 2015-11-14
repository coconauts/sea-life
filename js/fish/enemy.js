var enemies = [];

HUNGRY_THRESHOLD= 100;
ENEMY_DISTANCE = 500;

var enemyUtils = new Enemy();

function Enemy() {

    this.add = function(x, y){
      var enemy = new Fish(x,y);
      enemy.stage = LARVA;

      enemy.type = ENEMY;
      enemy.index = enemies.length;

      enemies.push(enemy);
      return enemy;
    };

    this.updateAll = function(modifier){

      for (var e in enemies) {
        var enemy = enemies[e];

        enemy.index = e; //Update index as enemies can be removed from list

        if (enemy.stage == DEAD) enemies.splice(e,1);
        else updateOne(enemy, modifier);
      }
    };

    var updateOne = function(fish, modifier){

      if (!fish.following && fish.food < HUNGRY_THRESHOLD){
        var close = findClose(fish);
        fish.following = close;
        //console.log("Enemy " , fish, " following " , close);
      }

      if (fish.following &&
        (fish.following.index > enemies.length || //Target is dead
        fish.following == fish.index)) { //Race condition
        fish.following = undefined;
      }

      fish.move(modifier);

    };

    var findClose = function(enemy) {
      var max = Math.max(enemy.index -5, 0);
      var min = Math.min(enemy.index +5, enemies.length);

      var index = randomBetween(max, min);
      if (enemy.index == index || !enemies[index]) return findClose(enemy); //Try again
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

}
