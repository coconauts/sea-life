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
	updateChildren(modifier); //AI

	//Enemy collision
	updateCollision(modifier);

	sectors.visit(player.x,player.y);

};

var updateCollision = function(modifier){
	for (var i= 0; i < enemies.length; i++){
    var enemy = enemies[i];
    if (collision.collision(enemy, player, SIZE)) {
			attack(player,enemy, modifier);

			if (enemy.stats.health <= 0)	enemies.splice(i,1);

		}
  }
};

var receiveAttack = function(attacker, defender, modifier) {
	var attack = attacker.stats.attack * ( 1 - defender.stats.defense) * modifier;
	if (attack > 0) defender.stats.health -= attack;
};
var attack = function(player,enemy, modifier){
//	console.log("Attack " , player, enemy);
	receiveAttack(player,enemy, modifier);
	receiveAttack(enemy,player, modifier);

	if (player.stats.health <= 0) player.dead = true;
	//if (enemy.stats.health < 1) enemy.dead = true;
};

var move = function(obj, modifier){
  obj.x  = obj.x + obj.direction.x * obj.stats.speed * MOVE_SPEED * modifier;
  obj.y =  obj.y + obj.direction.y * obj.stats.speed * MOVE_SPEED * modifier;
};

var isCollidingBlocks = function(obj, direction, offset){
	if (!offset) offset = p(0,0);
		for (var i=0; i < blocks.length; i++){
		var block = blocks[i];

		var isColliding = collision.isCollidingDirection(block, obj, direction, offset);
		if (isColliding) return true;
	}
	return false;
};
