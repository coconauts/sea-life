var children = [];
var eggs = [];

var FOLLOW_DISTANCE = 100;

var addEgg = function(x,y){
  console.log("Adding egg on ",x,y);
  var egg = fish(x,y);
  var index = eggs.length;
  eggs.push(egg);

  setTimeout(function(){
    delete eggs[index];
    children.push(egg);
  }, 2000);
};


var updateChildren = function(modifier){

  for (var i= 0; i < children.length; i++){
    var child = children[i];

    var d = distance(player.x,player.y, child.x,child.y);
    if (d < FOLLOW_DISTANCE) follow(child, modifier);
  }
};

var follow = function(child, modifier){

  var d = distance(player.x,player.y, child.x,child.y);

  var vx = (player.x - child.x) / d; //use child.x - player. to flee
  var vy = (player.y - child.y ) / d;

  child.x  = child.x+ vx * child.stats.speed * MOVE_SPEED * modifier;
  child.y =  child.y+ vy * child.stats.speed * MOVE_SPEED * modifier;
};
