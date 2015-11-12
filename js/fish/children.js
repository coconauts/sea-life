var children = [];

var FOLLOW_DISTANCE = 100;

var childUtils = new Children();

function Children() {

    this.add = function(x,y){
      console.log("Adding children egg on ",x,y);
      var child = new Fish(x,y);
      child.type = CHILD;
      children.push(child);
    };

    this.updateAll = function(modifier){

      for (var c in children){
        var child = children[c];

        var d = distance(player.x,player.y, child.x,child.y);
        if (d < FOLLOW_DISTANCE) child.following = player;

        if (child.following) this.follow(modifier);
      }
    };
}
