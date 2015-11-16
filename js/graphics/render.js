// Draw everything
var render = function () {

	camera.clear();

	// drawSectors(player.x,player.y);

	//sectors.drawVisibleBackground(player.x,player.y);

	drawFishes(children, false, false);
	drawFishes(enemies, true, false);

	drawFishes(online.all(), false, true);

	if (player.stage != DEAD) {
		camera.center(player.x,player.y);
	 	drawFish(player);
		drawStats(player);
	}

	drawHUD();
	drawDebug();
};

var drawFishes = function(array, withStats, withName) {
	for (var i in array){
    var fish = array[i];

		//item might be null if you use `delete array[i]`, like eggs or enemies
    if (fish) {
			if (withStats) drawStats(fish);

			if (withName && fish.name) {
				drawText(fish.x, fish.y - 20, fish.name);
			}

			if (fish.stage === 0) drawEgg(fish);
			else drawFish(fish);
		}
  }
};

var drawStats = function(fish) {

	drawArc(fish.x,fish.y -5, {r: 50, color: "green"}, fish.health * 100);
	drawArc(fish.x,fish.y -5, {r: 35, color: "orange"}, fish.food);

	drawArc(fish.x,fish.y +5, {r: 35, color: "red", position: "bottom"}, fish.stats().attack * 100);
	drawArc(fish.x,fish.y +5, {r: 50, color: "gray", position: "bottom"}, fish.stats().defense * 100);
	drawArc(fish.x,fish.y +5, {r: 65, color: "blue", position: "bottom"}, fish.stats().speed * 100);
/*
	drawText(fish.x,fish.y - 90, "ST "+fish.stage);
	drawText(fish.x,fish.y - 70, "F "+fish.food);
	drawText(fish.x,fish.y - 50, "H "+ fish.health.toFixed(2));
	drawText(fish.x,fish.y + 50, "S "+fish.stats().speed);
	drawText(fish.x,fish.y + 70, "D "+fish.stats().defense);
	drawText(fish.x,fish.y + 90, "A "+fish.stats().attack);
	*/

};

function drawHUD(){
	var o = camera.origin();
	drawText(o.x+50, o.y+20, "Enemies "+enemies.length);
	drawText(o.x+50, o.y+50, "Children "+children.length);
}
