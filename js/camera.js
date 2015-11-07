
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var camera = new Camera();

function Camera(){

  var c = {
    x: canvas.width/2,
    y: canvas.height/2
  };
  var zoom = 1;

  this.translate = function(x,y){
    //ctx.save();
    ctx.translate(x, y);
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
    //ctx.fillRect(c.x - halfW, c.y - halfH, c.x+ halfW, c.y+halfH);
    ctx.clearRect(c.x - halfW, c.y - halfH,canvas.width * invZoom,canvas.height* invZoom);
    ctx.fillRect(c.x - halfW, c.y - halfH,canvas.width* invZoom,canvas.height* invZoom);

    //context.clearRect(0, 0, canvas.width, canvas.height);
  };

  this.center = function(x,y){
    //ctx.save();

    var diffX = c.x - x;
    var diffY = c.y - y;
    c.x -= diffX;
    c.y -= diffY;

    //console.log("Center "+x,y+":" + c);
    ctx.translate(diffX, diffY);
    //this.clear();
  };

}

camera.zoom(0.5);
