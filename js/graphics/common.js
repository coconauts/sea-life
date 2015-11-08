var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

SIZE = 32;

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

var drawText = function(x,y, text) {
	ctx.fillStyle = "white";
	ctx.font = "16px Helvetica";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(text, x,y);
};
