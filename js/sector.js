var sectors = new Sectors();

var FISH_PER_SECTOR = 1;


var backgroundImage =  setImage("imgs/dust.jpg");

function Sectors(){

  var generated = {};
  var w = 500;

  this.getGenerated = function(){
    return generated;
  };
  this.origin = function(x,y){
    if (x> 0) origX = x - (x % w);
    else origX = x - (w + (x % w)) ;

    if (y > 0)origY = y - (y % w);
    else 	origY = y - (w + (y % w)) ;

    return {x: origX, y: origY};
  };

  this.width = function(){
    return w;
  };
  this.id = function(origin){
    return origin.x+","+origin.y;
  };

  this.drawVisibleBackground = function(x, y){
    var origin = this.origin(x, y);

    this.drawBackground(origin.x, origin.y);
  };
  
  this.drawBackground = function(x, y){
    try {
      console.log("drawing background on ", x,y);
      var pat=ctx.createPattern(backgroundImage,"repeat");
      ctx.rect(x, y,w,w);
      ctx.fillStyle=pat;
      ctx.fill();
    } catch (e) {
      console.error("Unable to draw background", e);
    }
  };

  this.visit = function(x,y){

    this.getOrCreate(x, y);

    this.getOrCreate(x+w, y);
    this.getOrCreate(x, y+w);
    this.getOrCreate(x+w, y+w);
    this.getOrCreate(x-w, y);
    this.getOrCreate(x, y-w);
    this.getOrCreate(x-w, y-w);
    this.getOrCreate(x+w, y-w);
    this.getOrCreate(x-w, y+w);
  };

  this.addFish = function(fish) {
    var s = generated[fish.sector];
    if (s) {
      s.fishes[fish.id] = fish;
      //console.log("Adding fish "+fish.id+" to sector ", s);

    } else { //outside known space, we can remove this fish
      fish.stage = DEAD;
    }
  };

  this.removeFish = function(fish) {
    var s = generated[fish.sector];
    if (s) {
      delete s.fishes[fish.id];
      //console.log("Removing fish "+fish.id+" from sector ", s);

    } else { //outside known space, we can remove this fish
      fish.stage = DEAD;
    }
  };

  this.getOrCreate = function(x, y){
    var origin = this.origin(x, y);
    var id = this.id(origin);

    var s = generated[id];
    if (s) return s;
    else return this.create(x, y);

  };

  this.randomPosWithinSector = function(x,y){
    return {
            x: randomBetween(x, x+w),
            y: randomBetween(y, y+w)
          };
  };

  this.create = function(x, y){
    var origin = this.origin(x,y);
    var id = this.id(origin);

    generated[id] = {x: origin.x,
      y: origin.y,
      fishes: {}
    };

    for (var i = 0; i < FISH_PER_SECTOR; i++){
      var random = this.randomPosWithinSector(origin.x,origin.y);
      var enemy = enemyUtils.add(random.x, random.y);
      enemy.sector = id;
      this.addFish(enemy);
    }

    console.log("Generating new sector " + id , generated[id]);

    console.log("Total sectors " + Object.keys(generated).length);

    return generated[id];
  };
}
