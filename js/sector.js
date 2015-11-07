var sectors = new Sectors();

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

    generated[id] = {x: origin.x, y: origin.y};

    var random = this.randomPosWithinSector(origin.x,origin.y);
    addEnemy(random.x, random.y);
    console.log("Generating new sector " + id , generated[id]);

    console.log("Total sectors " + Object.keys(generated).length);

    return generated[id];
  };
}
