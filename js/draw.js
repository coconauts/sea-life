// Create the canvas

var SIZE = 32;

var directionToRotation = function(direction){
		switch(direction){
			case RIGHT : return 0;
			case LEFT: return 180;
			case DOWN: return 90;
			case UP: return 270;

		}
}
// Draw everything
var render = function () {
	//    ctx.clearRect(0,0,canvas.width,canvas.height);
/*
	if (bgReady) {
		ctx.drawImage(bgImage,0 , 0);
	}*/
//	ctx.fillRect(0,0,canvas.width,canvas.height);

	camera.clear();
	if (player.x) camera.center(player.x,player.y);


	//drawBackground();

	drawRect(player.x,player.y);
	drawStats(player);

	if (!player.dead) {
		var image;
		if(player.sprite == 0) image = playerImageClose;
		else image = playerImageOpen;
		//TODO rotate with direction
	//	ctx.drawImage(image, player.x, player.y, SIZE, SIZE);
	  var rotation = directionToRotation(player.direction);
		drawRotated(image, player.x, player.y, rotation);
	}

	drawItems(children,playerImageOpen, false);
	drawItems(eggs,eggImage, false);
	drawItems(enemies,enemyImage, true);
};

var drawItems = function(array, image, withStats) {
	for (var i=0; i < array.length; i++){

    var item = array[i];
		if (withStats) drawStats(item);

		//item might be null if you use `delete array[i]`, like eggs
    if (item) ctx.drawImage(image, item.x, item.y,SIZE, SIZE);
  }
};

var drawStats = function(fish) {
	drawText(fish.x,fish.y - 60, "F "+fish.stats.food);
	drawText(fish.x,fish.y - 30, "H "+ fish.stats.health.toFixed(2));
	drawText(fish.x,fish.y + 30, "S "+fish.stats.speed);
	drawText(fish.x,fish.y + 60, "D "+fish.stats.defense);
	drawText(fish.x,fish.y + 90, "A "+fish.stats.attack);

};

var drawText = function(x,y, text) {
	ctx.fillStyle = "white";
	ctx.font = "32px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(text, x,y);

};

function drawBackground(){
	for (var i= 0; i < background.length; i++){
		var b = background[i];

		//ctx.drawImage(backgroundImage.center, b.x, b.y  ,SIZE, SIZE);
		for (var j= 0; j < b.directions.length; j++){
			var d = b.directions[j];
			ctx.drawImage(backgroundImage[d], b.x, b.y  ,SIZE, SIZE);
		}
	}
}

function drawRect(x,y) {

		var origin = sectors.origin(x,y);
		var w = sectors.width();

		//console.log("Origin " ,origin);
	  ctx.beginPath(); //
		ctx.lineWidth = 5;
		ctx.strokeStyle="red";
		ctx.rect(origin.x,origin.y,w,w);
		ctx.stroke();

		ctx.beginPath(); //

		ctx.lineWidth = 1;

		ctx.strokeStyle="orange";

		ctx.rect(origin.x+w, origin.y,w,w);
		ctx.rect(origin.x+w, origin.y+w,w,w);
		ctx.rect(origin.x, origin.y+w,w,w);

		ctx.rect(origin.x-w, origin.y,w,w);
		ctx.rect(origin.x-w, origin.y-w,w,w);
		ctx.rect(origin.x, origin.y-w,w,w);

		ctx.rect(origin.x+w, origin.y-w,w,w);
		ctx.rect(origin.x-w, origin.y+w,w,w);

		ctx.stroke();
}

var TO_RADIANS = Math.PI/180;

//http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
function drawRotated(image, x, y, angle) {
	 var halfWidth = image.width/2;
	 var halfHeight = image.height/2;
		ctx.save();
		ctx.translate(x +halfWidth, y + halfHeight);
		ctx.rotate(angle * TO_RADIANS);
		ctx.drawImage(image, -halfWidth, -halfHeight);
		ctx.restore();
	}
