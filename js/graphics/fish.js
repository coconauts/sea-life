
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
