var player = new Fish(canvas.width / 2, canvas.height / 2);

player.stage = LARVA;
player.type = PLAYER;
player.name = randomName();

player.move = function(modifier){
  if (Fish.prototype.move.call(this,modifier) ) {
    //console.log("Player is moving");
		//ws.send({type: 'move', x: this.x, y: this.y});
  }
};

setInterval(function(){
  //  console.log("Sending player");
    ws.send({type: 'update', fish: player});
},100);
