var player = fish(canvas.width / 2, canvas.height / 2);

setInterval(function(){
  player.stats.food-= 1;
}, 1000);
