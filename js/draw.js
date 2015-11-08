// Create the canvas

var SIZE = 32;

// Draw everything
var render = function () {

	camera.clear();
	if (player.x) camera.center(player.x,player.y);

	drawSectors(player.x,player.y);

	drawFishes(children, false);
	drawFishes(enemies, true);

	if (player.stage != DEAD) {
	 	drawFish(player);
		drawStats(player);
	}

	drawHUD();
};

var drawFishes = function(array, withStats) {
	for (var i in array){

    var item = array[i];

		//item might be null if you use `delete array[i]`, like eggs or enemies
    if (item) {
			if (withStats) drawStats(item);

			if (item.stage === 0) drawEgg(item);
			else drawFish(item);
			//ctx.drawImage(image, item.x -SIZE/2, item.y - SIZE/2,SIZE, SIZE);

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
	drawText(fish.x,fish.y + 90, "A "+fish.stats().attack);*/

};

var drawText = function(x,y, text) {
	ctx.fillStyle = "white";
	ctx.font = "16px Helvetica";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(text, x,y);

};

function drawSectors(x,y) {

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

		ctx.strokeStyle="oranwge";

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

var drawEgg = function(fish) {

	var grd=ctx.createLinearGradient(fish.x,fish.y, fish.x +20,fish.y);
	grd.addColorStop(0, "white");
	grd.addColorStop(1,"gray");
	ctx.strokeStyle=grd;

	//ctx.strokeStyle="white";
	drawEllipse(fish.x,fish.y - 5, 5, 10);

};
var drawFish = function(fish) {

	ctx.save();

	var x = -20;
	var y = -10 ;
	var h = 15;
	var w = 48;

	var BODY_MAX_WIDTH = 5;
	var BODY_MARGIN = 3;
	var topX = x+12;
	var bottomX = x+12;

	var moveY = randomBetween(-5,5);

	var angle = directionToAngle(fish.direction);
	ctx.translate(fish.x  , fish.y );
	ctx.rotate(angle * TO_RADIANS);

	ctx.beginPath();

	var grd=ctx.createLinearGradient(x,y, x,y+15);
	grd.addColorStop(0, fish.color);
	grd.addColorStop(1,"white");
	ctx.fillStyle=grd;

	//HEAD
	ctx.moveTo(x-5,y+5);
	ctx.lineTo(x+10,y);
	ctx.lineTo(x+9,y+15);
  ctx.fill();

	//BODY
	var tailY = y + randomBetween(5, 10);
	ctx.moveTo(x+12, y);
	ctx.lineTo(x+40, tailY);
	ctx.lineTo(x+12,y+15);
	ctx.fill();


	//Fins:
	ctx.moveTo(x+14, y-2);
	ctx.lineTo(x+25, y - 4);
	ctx.lineTo(x+25,y+2);
	ctx.fill();

	ctx.moveTo(x+14, y +h+2);
	ctx.lineTo(x+25, y +h+4);
	ctx.lineTo(x+25,y+h-2);
	ctx.fill();


/*
	var fishBody = function() {

		ctx.beginPath();
		ctx.fillStyle="red";

		ctx.moveTo(topX,y);

		var incTopX = randomBetween(1, BODY_MAX_WIDTH);
		var incBottomX = randomBetween(1, BODY_MAX_WIDTH);

		ctx.lineTo(topX + incTopX,y);
		ctx.lineTo(bottomX + incBottomX,y+ h);
		ctx.lineTo(bottomX,y+h);

		topX+= incTopX +BODY_MARGIN;
		bottomX += incBottomX +BODY_MARGIN;

		y += moveY;
		ctx.fill();
	};


	fishBody();
	fishBody();
	fishBody();
	fishBody();*/

	//tail

	//ctx.translate(x , y );
	//ctx.translate(-topX , -y );

//ctx.rotate(angle * TO_RADIANS);

	ctx.moveTo(x+40,tailY);
	ctx.lineTo(x+55,y);
	ctx.lineTo(x+48,tailY);
	ctx.lineTo(x+55,y+15);

	ctx.fill();

	//EYES
	ctx.beginPath();

	ctx.fillStyle="black";
	ctx.arc(x+5, y +2, 2,0,2*Math.PI);
	ctx.arc(x+5, y+13, 2,0,2*Math.PI);
	ctx.fill();

	ctx.restore();
};

function drawEllipse(x, y, w, h) {
  var kappa = 0.5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

	ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  //ctx.closePath(); // not used correctly, see comments (use to close off open path)
  ctx.stroke();
}

var drawArc = function(x,y, props, percent){
	ctx.beginPath();
	var r = props.r;
	var arc = Math.PI * percent / 100;
	 ctx.lineWidth=10;
	 ctx.strokeStyle= props.color;

	 var origAngle, endAngle ;
	 if (props.position == "bottom") {
		 origAngle = Math.PI - arc;
		 endAngle =  Math.PI;
	 } else {
		 origAngle = Math.PI;
		 endAngle = arc + Math.PI;
	 }
	ctx.arc(x,y, r, origAngle, endAngle );
	ctx.stroke();
};

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

	var directionToAngle= function(direction) {
		switch(direction){
			case LEFT: return 0;
			case UP: return 90;
			case RIGHT: return 180;
			case DOWN: return 270;
		}
	};

function drawHUD(){
	var o = camera.origin();
	drawText(o.x+50, o.y+20, "Enemies "+enemies.length);
	drawText(o.x+50, o.y+50, "Children "+children.length);
}
