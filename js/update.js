var update = function (modifier) {
	controls(modifier);

	player.move(modifier);

	enemyUtils.updateAll(modifier); //AI
	//childrenUtils.updateAll(modifier); //AI

	//Enemy collision
	updateCollision(modifier);

	sectors.visit(player.x,player.y);
};

var updateCollision = function(modifier){
	for (var i in enemies) {
    var enemy = enemies[i];

		if (enemy.following) collisionAttack(enemy, enemies[enemy.following.index], modifier);

		collisionAttack(enemy, player, modifier);
  }
};
