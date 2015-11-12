var drawEgg = function(fish) {

	var grd=ctx.createLinearGradient(fish.x,fish.y, fish.x +20,fish.y);
	grd.addColorStop(0, "white");
	grd.addColorStop(1,"gray");
	ctx.strokeStyle=grd;

	//ctx.strokeStyle="white";
	drawEllipse(fish.x,fish.y - 5, 5, 10);
};
