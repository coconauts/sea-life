
var MAX_TAIL_OFFSET = 10;

var drawFish = function(fish) {

	var animation = {  // TODO
		tailOffset: 0,
	};

	fish.animation = animation;

	ctx.save();

	var fishCenterOffset = Math.floor((
		fish.shape.headLength + fish.shape.bodyLength + fish.shape.tailLength
	)/2) - fish.shape.headLength;

	var x = - fishCenterOffset;
	var y = 0;

	var moveY = randomBetween(-5,5);
	fish.animation.tailOffset = moveY;

	ctx.translate(fish.x  , fish.y );
	ctx.rotate(fish.angle * TO_RADIANS);
	ctx.beginPath();

	var grd=ctx.createLinearGradient(x,y, x,y+15);  // TODO adjust
	grd.addColorStop(0, fish.color);
	grd.addColorStop(1,"white");
	ctx.fillStyle=grd;

	//HEAD

	ctx.moveTo(x-fish.shape.headLength, y);
	ctx.lineTo(x, y+fish.shape.bodyWidth/2);
	ctx.lineTo(x, y-fish.shape.bodyWidth/2);
	ctx.fill();

	//BODY
	ctx.moveTo(x, y+fish.shape.bodyWidth/2);
	ctx.lineTo(x+fish.shape.bodyLength, y+fish.animation.tailOffset);
	ctx.lineTo(x, y-fish.shape.bodyWidth/2);
	ctx.fill();

	//Tail
	// TODO prettier tail top+bottom calculation
	var bodyEndX = x+fish.shape.bodyLength;
	var bodyEndY = y+fish.animation.tailOffset;

	var tailOffset = fish.animation.tailOffset;
	var topTailY = -fish.shape.tailWidth/2 + bodyEndY;
	var bottomTailY= fish.shape.tailWidth/2 + bodyEndY;

	ctx.moveTo(bodyEndX, bodyEndY);
	ctx.lineTo(bodyEndX + fish.shape.tailLength, topTailY);
	ctx.lineTo(bodyEndX + fish.shape.tailLength/2, bodyEndY);
	ctx.lineTo(bodyEndX + fish.shape.tailLength, bottomTailY);

	ctx.fill();

	//EYES
	ctx.beginPath();
	ctx.fillStyle="white";
	ctx.strokeStyle = "black";
	ctx.lineWidth   = 1;
	var eyeWidth = fish.shape.bodyWidth*0.3;
	var eyeLength = fish.shape.headLength/2;
	ctx.arc(x - eyeLength, y + eyeWidth,2,0,2*Math.PI);
	ctx.arc(x - eyeLength, y - eyeWidth,2,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

	ctx.restore();

	// DEBUG, to see the center of the fish
	ctx.beginPath();
	ctx.fillStyle="black";
	ctx.arc(fish.x, fish.y, 2,0,2*Math.PI);
	ctx.fill();

};
