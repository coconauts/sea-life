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
	updateCollision();

	sectors.visit(player.x,player.y);

};

var updateCollision = function(){
	for (var i= 0; i < enemies.length; i++){
    var enemy = enemies[i];
    if (collision.collision(enemy, player, SIZE)) {
			attack(player,enemy);

			if (enemy.stats.health <= 0)	enemies.splice(i,1);

		}
  }
};

var receiveAttack = function(attacker, defender) {
	var attack = attacker.stats.attack * ( 1 - defender.stats.defense);
	if (attack > 0) defender.stats.health -= attack;
};
var attack = function(player,enemy){
	console.log("Attack " , player, enemy);
	receiveAttack(player,enemy);
	receiveAttack(enemy,player);

	if (player.stats.health <= 0) player.dead = true;
	//if (enemy.stats.health < 1) enemy.dead = true;
};

var move = function(obj, modifier){

  obj.x  = obj.x + obj.direction.x * obj.stats.speed * 100 * modifier;
  obj.y =  obj.y + obj.direction.y * obj.stats.speed * 100 * modifier;

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
