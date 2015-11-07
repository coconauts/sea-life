var playerSpriteTimeout ;
// Update game objects
var update = function (modifier) {
	controls(modifier);

	//console.log("Moving camera ", player.x , player.y);

	if (player.dead || isCollidingBlocks(player,player.direction)){
		clearTimeout(playerSpriteTimeout);
		player.isMoving = false;
	} else {
		if (!player.isMoving) {
			player.isMoving = true;
			playerSpriteTimeout = setInterval(function(){
				player.sprite = (player.sprite +1) %2;
			}, 250);
		}
		move(player, modifier);
	}
	updateEnemies(modifier); //AI

	//Enemy collision
	for (var i= 0; i < enemies.length; i++){
    var enemy = enemies[i];
    if (collision.collision(enemy, player, SIZE)) {
			attack(player,enemy);

			if (enemy.stats.health < 1)	enemies.splice(i,1);

		}
  }
	//Eating dots
	for (var i= 0; i < dots.length; i++){
    var dot = dots[i];
    if (collision.collision(dot, player, SIZE / 2)) dots.splice(i, 1);
  }

	sectors.visit(player.x,player.y);

};

var attack = function(player,enemy){
	player.stats.health -= 1;
	enemy.stats.health -= 1;

	if (player.stats.health < 1) player.dead = true;
	//if (enemy.stats.health < 1) enemy.dead = true;
};

var move = function(obj, modifier){

  obj.x  = obj.x + obj.direction.x * obj.stats.speed  * modifier;
  obj.y =  obj.y + obj.direction.y * obj.stats.speed * modifier;

  //if (obj.y < 0 ) obj.y = canvas.height;
  //else if (obj.y > canvas.height ) obj.y = 0 ;
}

var isCollidingBlocks = function(obj, direction, offset){
	if (!offset) offset = p(0,0);
		for (var i=0; i < blocks.length; i++){
		var block = blocks[i];

		var isColliding = collision.isCollidingDirection(block, obj, direction, offset);
		if (isColliding) return true;
	}
	return false;
}
