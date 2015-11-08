// Create the canvas




var SIZE = 32;

var directionToRotation = function(direction){
		switch(direction){
			case RIGHT : return 0;
			case LEFT: return 180;
			case DOWN: return 90;
			case UP: return 270;

		}
};

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
		//drawRotated(image, player.x, player.y, rotation);

		// Creates circle at x = 50, y = 40, with radius 10
		paper.circle(player.x, player.y, 10)
			.attr("fill", "#f00")
			.attr("stroke", "#fff");

	//	triangle(player.x, player.y, player.x+ 10, player.y+10, player.x + 10, player.y-10);
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

/*
var param = {stroke: "#fff", "stroke-width": 30};
		var path = paper.path().attr(param).attr({arc: [0, 60, 45]});*/
	//	path.animate({arc: [45,60,200]},750, "elastic");
drawArc(fish.x,fish.y, fish.health * 100);

var fontStyle = {fill: "#fff"};
paper.text(fish.x,fish.y - 90, "ST "+fish.stage).attr(fontStyle);
paper.text(fish.x,fish.y - 80, "F "+fish.food).attr(fontStyle);
paper.text(fish.x,fish.y - 70, "H "+ fish.health.toFixed(2)).attr(fontStyle);
paper.text(fish.x,fish.y + 70, "S "+fish.stats().speed).attr(fontStyle);
paper.text(fish.x,fish.y + 80,  "D "+fish.stats().defense).attr(fontStyle);
paper.text(fish.x,fish.y + 90,  "A "+fish.stats().attack).attr(fontStyle);

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

		ctx.strokeStyle="yellow";

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

var drawArc = function(x,y,percent){

	var r = 30;
	var alpha = 180 / 100 * percent;
	var a = (90 - alpha) * Math.PI / 180;
	var ax = x + r * Math.cos(a);
	var ay = y - r * Math.sin(a);

		path = [["M", x, y - r],
			["A", r, r, 0, +(alpha > 180), 1, ax, ay]];

		paper.path(path)
			.attr({stroke: "#0F0", "stroke-width": 5});

};

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
