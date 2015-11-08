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
    food: 100,
    stats: adjustedStats,
    grow: grow,
    follow: follow
  };
};



var lifeTimes = {
  0: 5, //EGG
  1: 60, //LARVA
  2: 60, //YOUNG
  3: 600 //ADULT
};

var grow = function(){
  var fish = this;
  if (fish.secondsAlive > lifeTimes[fish.stage]){
    fish.stage += 1;
    console.log("fish leveled up ", fish);
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
  var min = 0.15;
  var max = 0.7;

  var r1 = floatRandomBetween(min, max);
  var r2 = floatRandomBetween(r1+min, Math.min(r1+max, 1-min));

  var v1 = r1;
  var v2 = r2 - r1;
  var v3 = 1 - r2;

  /* //testing
  var combined = v1 + v2 + v3;
  if (combined<0.95 || combined > 1.05) {alert("invalid stats: "+v1 + " " +v2 +" "+v3);}
  if (v1<0.15 || v2<0.15 || v3<0.1){alert("invalid stats: "+v1 + " " +v2 +" "+v3);}
  if (v1>0.7 || v2>0.7 || v3>0.7){alert("invalid stats: "+v1 + " " +v2 +" "+v3);}
  */
  return {
    attack: v1,
    defense: v2,
    speed: v3,
  };

};

var follow = function(fish, modifier){

  var d = distance(fish.x,fish.y, this.x,this.y);

  var vx = (fish.x - this.x) / d; //use child.x - player. to flee
  var vy = (fish.y - this.y ) / d;

  var speed = MOVE_SPEED;
  if (d < FOLLOW_DISTANCE / 2) {
    speed = speed * (1/d); //Reduce speed when getting closer;
  }

  this.x  = this.x+ vx * this.stats().speed * speed * modifier;
  this.y =  this.y+ vy * this.stats().speed * speed * modifier;
};
