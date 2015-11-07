// Game objects

var fish = function(x,y){
  return {
    direction: LEFT,
    dead: false,
    sprite: 0,
    x: x,
    y: y,
    stats: generateStats(),
  };
};


var generateStats = function(){
  var speed = floatRandomBetween(0.2, 0.8);
  var attack = floatRandomBetween(0.2, 0.8-speed);
  var defense = (1 - speed - attack).toFixed(2);

  return {
    health: 1,
    food: 1,
    attack: attack,
    defense: defense,
    speed: speed,
  };

};

var addEnemy = function(x, y){
  var enemy = fish(x,y);

  startAi(enemy);
  enemies.push(enemy);
};



var enemies = [];
var dots = [];
var blocks = [];

var background = [];
