var children = [];

var FOLLOW_DISTANCE = 100;

var addEgg = function(x,y){
  console.log("Adding egg on ",x,y);
  var child = fish(x,y);
  child.type = CHILD;
  children.push(child);
};

var updateChildren = function(modifier){

  for (var c in children){
    var child = children[c];

    var d = distance(player.x,player.y, child.x,child.y);
    if (d < FOLLOW_DISTANCE) child.follow(player, modifier);
  }
};
