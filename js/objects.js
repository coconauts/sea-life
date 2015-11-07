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
  var speed = floatRandomBetween(0.1, 0.9);
  var defense = floatRandomBetween(0.1, 0.9-speed);
  var attack = 1 - speed - defense;

  return {
    health: 1,
    food: 1,
    attack: attack,
    defense: defense,
    speed: speed,
  };

};

var player = fish(canvas.width / 2, canvas.height / 2);


var enemies = [];
var dots = [];
var blocks = [];

var background = [];
