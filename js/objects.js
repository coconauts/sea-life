// Game objects

var fish = function(x,y){
  return {
    direction: LEFT,
    speed: 100,
    sprite: 0,
    x: x,
    y: y,
    stats: {
      health: 100,
      food: 100,
      attack: 1,
      defense: 1
    }
  };
};


var player = fish(canvas.width / 2, canvas.height / 2);


var enemies = [];
var dots = [];
var blocks = [];

var background = [];
