// Handle keyboard controls
var keysDown = {};

var KEY_UP =38, KEY_DOWN =40, KEY_LEFT =37, KEY_RIGHT =39;

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


addEventListener("click", function(e) {
	var x = e.pageX - canvas.offsetLeft ;
	var y = e.pageY - canvas.offsetTop;

	var world = worldPosition(x,y);
	console.log("click ",x,y, " to world ",world);
	player.following = world;
}, false);

var worldPosition = function(x,y) {
	var originWorld = camera.origin();
	return {x: parseInt(originWorld.x + x),
		y: parseInt(originWorld.y + y)
	};
}

addEventListener('contextmenu', function(e){ //Right click

	childUtils.add(player.x,player.y);

	e.preventDefault();
  return(false);
}, false);

//Called from update.js
var controls = function(modifier){
  if (KEY_LEFT in keysDown)  player.direction = LEFT;
  if (KEY_RIGHT in keysDown )  player.direction = RIGHT;
	if (KEY_UP in keysDown )  player.direction = UP;
	if (KEY_DOWN in keysDown )  player.direction = DOWN;

}
