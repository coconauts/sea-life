var online = new OnlineFish();

function OnlineFish() {

  var fishes = {};

  this.getOrCreate= function(id) {
    if (!fishes[id]) {
      var fish = new Fish(0,0);
      fish.stage = LARVA;
      fish.name = id;
      fishes[id] = fish;
    }
    return fishes[id];
  }
  this.update= function( json) {
    var fish = this.getOrCreate(json.id);
    console.log("Updating online fish ",fish,json);

    fish.x = json.x;
    fish.y = json.y;
    fish.name = json.name;
    fish.angle = json.angle;

    fish.updated = new Date().getTime();
  }

  this.all = function() {
    var all = [];
    var keys = Object.keys(fishes);
    for (var k in keys){
      var key = keys[k];
      all.push(fishes[key]);
    }
    return all;
  }
}
