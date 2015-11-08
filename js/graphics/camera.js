var camera = new Camera();

//var paper = Raphael(0,0,canvas.width, canvas.height);
//var panZoom = paper.panzoom({ initialZoom: 1, initialPosition: { x: 0, y: 0} });
//  panZoom.enable();

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
    //paper.setViewBox(c.x, c.y,canvas.width * z,canvas.height * z,false);
  //  Paper.setSize(canvas.width * z,canvas.height * z);
  //panZoom.zoomOut(z);
  };
  this.clear = function(){

    ctx.fillStyle="darkblue";

    var halfW = canvas.width /2;
    var halfH = canvas.height/2;
    var invZoom = (1/zoom);
    //ctx.fillRect(c.x - halfW, c.y - halfH, c.x+ halfW, c.y+halfH);
    ctx.clearRect(c.x - halfW, c.y - halfH,canvas.width * invZoom,canvas.height* invZoom);
    ctx.fillRect(c.x - halfW, c.y - halfH,canvas.width* invZoom,canvas.height* invZoom);

    //paper.clear();
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

    //paper.setViewBox(c.x, c.y,canvas.width,canvas.height,false);
    //panZoom.pan(diffX, diffY);
  //  paper.setViewBox(c.x - canvas.width /2, c.y - canvas.height / 2, canvas.width,canvas.height);

  };

}

camera.zoom(1);
