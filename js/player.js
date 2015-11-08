var player = fish(canvas.width / 2, canvas.height / 2);

player.stage = LARVA;

setInterval(function(){
  player.food-= 1;
  player.secondsAlive += 1;

  for (var i in enemies){
    enemy = enemies[i];
    enemy.secondsAlive += 1;
  };
}, 1000);
