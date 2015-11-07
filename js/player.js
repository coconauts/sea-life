var player = fish(canvas.width / 2, canvas.height / 2);
var children = [];
var eggs = [];

var addEgg = function(x,y){
  console.log("Adding egg on ",x,y);
  var egg = fish(x,y);
  var index = eggs.length;
  eggs.push(egg);

  setTimeout(function(){
    delete eggs[index];
    children.push(egg);
  }, 2000);
};

setInterval(function(){
  player.stats.food-= 1;
}, 1000);
