var playerSpriteTimeout ;
// Update game objects
var update = function (modifier) {
	controls(modifier);

	//console.log("Moving camera ", player.x , player.y);

	if (player.stage == DEAD){
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
	for (var i in enemies) {
    var enemy = enemies[i];

		if (enemy.following >= 0) collisionAttack(enemy, enemies[enemy.following], modifier);

		collisionAttack(enemy, player, modifier);
  }
};

var collisionAttack = function(fish1,fish2,modifier) {
	if (fish1 && fish2 && collision.collision(fish1, fish2, SIZE)) {
		attack(fish1,fish2, modifier);

		//We can move this check to Update
		if (fish1.health <= 0)	{
		//	enemies.splice(fish1.index,1);
			//delete enemies[fish1.index];
			fish1.stage = DEAD;
			fish2.food = 100;
			fish2.following = -1;

		} if (fish2.health <= 0){
			//enemies.splice(fish2.index,1);
			//delete enemies[fish2.index];
			fish2.stage = DEAD;
			fish1.food = 100;
			fish1.following = -1;
		}
		//if (player.health <= 0) player.dead = true;
	}
};

var receiveAttack = function(attacker, defender, modifier) {
	var attack = attacker.stats().attack * ( 1 - defender.stats().defense) * modifier;
	if (attack > 0) defender.health -= attack;
};
var attack = function(fish1, fish2, modifier){
//	console.log("Attack " , player, enemy);
	receiveAttack(fish1,fish2, modifier);
	receiveAttack(fish2,fish1, modifier);

	//if (enemy.stats.health < 1) enemy.dead = true;
};

var move = function(obj, modifier){
  obj.x  = obj.x + obj.direction.x * obj.stats().speed * MOVE_SPEED * modifier;
  obj.y =  obj.y + obj.direction.y * obj.stats().speed * MOVE_SPEED * modifier;
};
