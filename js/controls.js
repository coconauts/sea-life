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
  addEgg(player.x,player.y);
}, false);

//Called from update.js
var controls = function(modifier){
  if (KEY_LEFT in keysDown)  player.direction = LEFT;
  if (KEY_RIGHT in keysDown )  player.direction = RIGHT;
	if (KEY_UP in keysDown )  player.direction = UP;
	if (KEY_DOWN in keysDown )  player.direction = DOWN;

/*
	if (KEY_LEFT in keysDown )  camera.translate(1,0);
  if (KEY_RIGHT in keysDown) camera.translate(-1,0);
	if (KEY_UP in keysDown)  camera.translate(0,1);
	if (KEY_DOWN in keysDown)  camera.translate(0,-1);
*/
}
