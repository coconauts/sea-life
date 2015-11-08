setInterval(function(){
  for (var f in fishes) updateLife(fishes[f]);

  // updateLife(player);
  // for (var e in enemies)  updateLife(enemies[e]);
  // for (var c in children) updateLife(children[c]);

}, 1000);


var updateLife = function(fish){

  fish.food-= 1;
  fish.secondsAlive += 1;

  if (fish.health < 0 || fish.food < 0) fish.stage = DEAD;
  else if (fish.health < 1) fish.health += 0.01;

  fish.grow();

};
