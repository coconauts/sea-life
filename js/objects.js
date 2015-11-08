// Game objects
var MOVE_SPEED = 100;

const EGG = 0;
const LARVA = 1;
const YOUNG = 2;
const ADULT = 3;
const DEAD = 4;

var fish = function(x,y){
  return {
    direction: LEFT,
    dead: false,
    sprite: 0,
    x: x,
    y: y,
    stage: EGG,
    baseStats: generateStats(),
    secondsAlive: 0,
    health: 1,
    food: 1,
    stats: adjustedStats,
    grow: grow,
  };
};



var lifeTimes = {
  0: 20, //EGG
  1: 60, //LARVA
  2: 60, //YOUNG
  3: 600 //ADULT
};

var grow = function(){
  var fish = this;
  if (fish.secondsAlive > lifeTimes[fish.stage]){
    fish.stage += 1;
  }
  // dont be dead, for now
  fish.stage = Math.min(fish.stage, ADULT);
};


var adjustedStats = function(){
  var modifiers = {
    0: 0,   //EGG
    1: 0.3, //LARVA
    2: 0.6, //YOUNG
    3: 1    //ADULT
  };

  adjusted = {};
  for (var stat in this.baseStats){
    adjusted[stat] = this.baseStats[stat] * modifiers[this.stage];
    adjusted[stat] = adjusted[stat].toFixed(2);
  }
  return adjusted;
};


var generateStats = function(){
  var speed = floatRandomBetween(0.2, 0.8);
  var attack = floatRandomBetween(0.2, 0.8-speed);
  var defense = parseFloat((1 - speed - attack).toFixed(2));

  return {
    attack: attack,
    defense: defense,
    speed: speed,
  };

};

var addEnemy = function(x, y){
  var enemy = fish(x,y);
  enemy.stage = LARVA;

  startAi(enemy);
  enemies.push(enemy);
};



var enemies = [];
var dots = [];
var blocks = [];

var background = [];
