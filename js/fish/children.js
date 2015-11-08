var children = [];

var FOLLOW_DISTANCE = 100;

var addEgg = function(x,y){
  console.log("Adding egg on ",x,y);
  var child = fish(x,y);
  children.push(child);
};

var updateChildren = function(modifier){

  for (var i= 0; i < children.length; i++){
    var child = children[i];

    child.secondsAlive += modifier;

    child.grow();
    var d = distance(player.x,player.y, child.x,child.y);
    if (d < FOLLOW_DISTANCE) follow(child, modifier);
  }
};

var follow = function(child, modifier){

  var d = distance(player.x,player.y, child.x,child.y);

  var vx = (player.x - child.x) / d; //use child.x - player. to flee
  var vy = (player.y - child.y ) / d;

  var speed = MOVE_SPEED;
  if (d < FOLLOW_DISTANCE / 2) {
    speed = speed * (1/d); //Reduce speed when getting closer;
  }

  child.x  = child.x+ vx * child.stats().speed * speed * modifier;
  child.y =  child.y+ vy * child.stats().speed * speed * modifier;
};
