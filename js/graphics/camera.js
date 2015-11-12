var camera = new Camera();

function Camera(){

  var c = {
    x: canvas.width/2,
    y: canvas.height/2
  };
  var zoom = 1;

  this.origin = function(){
    var halfW = canvas.width /2;
    var halfH = canvas.height/2;
    return {x: c.x - halfW, y: c.y - halfH};
  };

  this.zoom = function(z){
    zoom = z;

    ctx.scale(z,z);
  };
  this.clear = function(){

    ctx.fillStyle="darkblue";

    var halfW = canvas.width /2;
    var halfH = canvas.height/2;
    var invZoom = (1/zoom);

    ctx.clearRect(c.x - halfW, c.y - halfH,canvas.width * invZoom,canvas.height* invZoom);
    ctx.fillRect(c.x - halfW, c.y - halfH,canvas.width* invZoom,canvas.height* invZoom);
  };

  this.center = function(x,y){

    var diffX = c.x - x;
    var diffY = c.y - y;
    c.x -= diffX;
    c.y -= diffY;

    ctx.translate(diffX, diffY);
  };

}

camera.zoom(1);
