setInterval(function(){
  var all =  fishes();
  for (var f in all) {
    var fish = all[f];
    updateSector(fish);
    updateLife(fish);
  }
}, 1000);

var updateLife = function(fish){

  fish.food-= 1;
  fish.secondsAlive += 1;

  if (fish.health < 0 || fish.food < 0) fish.stage = DEAD;
  else if (fish.health < 1) fish.health += 0.01;

  fish.grow();
};

var updateSector = function(fish){

  if (fish && fish.x) {

    var sectorId = sectors.id(sectors.origin(fish.x,fish.y));

    if (sectorId != fish.sector) {
      sectors.removeFish(fish);
      fish.sector = sectorId;
      sectors.addFish(fish);
    }

  }
};
