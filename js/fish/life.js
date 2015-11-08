setInterval(function(){

  updateLife(player);
  for (var e in enemies)  updateLife(enemies[e]);
  for (var c in children) updateLife(children[c]);

}, 1000);


var updateLife = function(fish){
  fish.food-= 1;
  fish.secondsAlive += 1;

  fish.grow();
};
