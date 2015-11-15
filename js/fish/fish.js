// Game thisects
var MOVE_SPEED = 500;

var EGG = 0;
var LARVA = 1;
var YOUNG = 2;
var ADULT = 3;
var DEAD = 4;

var PLAYER = 0;
var CHILD = 1;
var ENEMY = 2;

var fishes = function(){
  return [player].concat(enemies,children);
};

function Fish(x,y) {
  this.x = x;
  this.y = y;

  this.id = uuid();
  this.direction= LEFT;
  this.stage= EGG;
  this.baseStats= generateStats();
  this.secondsAlive= 0;
  this.health= 1;
  this.food= 100;
  this.color = randomColor();
  this.shape = generateShape();

  //Defined in runtime
  this.following = undefined; //{x:0,y:0} //in world coordinates
  this.type = ENEMY;
  this.index = 0; //Index in array for enemies
  this.name = ""; //Your fish name
  this.sector = "0,0"; //Sector you belong
}

var lifeTimes = {
  0: 5, //EGG
  1: 60, //LARVA
  2: 60, //YOUNG
  3: 600 //ADULT
};

Fish.prototype.grow = function(){
  var fish = this;
  if (fish.secondsAlive > lifeTimes[fish.stage]){
    fish.stage += 1;
    console.log("fish leveled up ", fish);
  }
  // dont be dead, for now
  fish.stage = Math.min(fish.stage, ADULT);
};


Fish.prototype.stats = function(){
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


var generateShape = function() {
  return {
    bodyWidth: randomBetween(5, 30),
    bodyLength: randomBetween(20, 60),
    headLength: randomBetween(5, 15),
    tailWidth: randomBetween(5, 20),
    tailLength: randomBetween(5, 15),
    finWidth: 8,
    finLength: 5,
  };
};

Fish.prototype.follow = function(modifier){
  var fish = this.following;

  if (fish && fish.x && fish.stage != DEAD) {

    var d = distance(fish.x,fish.y, this.x,this.y);

    var vx = (fish.x - this.x) / d; //use child.x - player. to flee
    var vy = (fish.y - this.y ) / d;

    var speed = MOVE_SPEED;
    if (this.type == CHILD && d < FOLLOW_DISTANCE / 2) {
      speed = speed * (1/d); //Reduce speed when getting closer;
    }

    this.x = this.x+ vx * this.stats().speed * speed * modifier;
    this.y =  this.y+ vy * this.stats().speed * speed * modifier;

    //Remove following when reaching destination
    if (d < 10) this.following = undefined;

    if (isNaN(this.x)) console.log("Generated NAN position from fish ", this, fish);
  }
};

var collisionAttack = function(fish1,fish2,modifier) {
	if (fish1 && fish2 && collision.collision(fish1, fish2, SIZE)) {
		attack(fish1,fish2, modifier);

		if (fish1.health <= 0)	{
			fish1.stage = DEAD;
			fish2.food = 100;
			fish2.following = undefined;

		} if (fish2.health <= 0){
			fish2.stage = DEAD;
			fish1.food = 100;
			fish1.following = undefined;
		}
	}
};

var receiveAttack = function(attacker, defender, modifier) {
	var attack = attacker.stats().attack * ( 1 - defender.stats().defense) * modifier;
	if (attack > 0) defender.health -= attack;
};
var attack = function(fish1, fish2, modifier){
	receiveAttack(fish1,fish2, modifier);
	receiveAttack(fish2,fish1, modifier);

	//if (enemy.stats.health < 1) enemy.dead = true;
};

Fish.prototype.move = function(modifier){
  if (this.stage == DEAD) return ;

  if (this.following) {
    this.follow(modifier);
    this.angle = headDirection(this, this.following);
  } else if (this.direction.x || this.direction.y) {
	  this.x  = this.x + this.direction.x * this.stats().speed * MOVE_SPEED * modifier;
	  this.y =  this.y + this.direction.y * this.stats().speed * MOVE_SPEED * modifier;

    this.angle =  directionToAngle(this.direction);
	}
};
