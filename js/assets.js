var setImage = function(img){
	var i = new Image();
	i.src = img;
	return i;
};

// Hero image
var playerImageClose =  setImage("images/32_player_close.png");
var playerImageOpen = setImage("images/32_player_open.png");

var monsterImage = setImage("images/enemy_red.png");

var dotImage = setImage("images/32_dot.png");
