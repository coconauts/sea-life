var randomBetween = function(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
};

var floatRandomBetween = function(min, max){
  var f = Math.random() * (max - min) + min;
  return parseFloat(f.toFixed(2));
};

var distance =  function(x, y, x0, y0){
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};

var randomColor = function(){
  var letters = '0123456789ABCDEF'.split('');
   var color = '#';
   for (var i = 0; i < 6; i++ ) {
       color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
};

function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  var id = "";
  for (var i=0; i< 5; i++ ) id+=s4();
  return id;
}

var headDirection = function(pos, target) {

  if (pos && target) {
    var x =  pos.x - target.x  ;
    var y =  pos.y - target.y;
    var rad = Math.atan2(y, x);
    var angle =  rad * (180/Math.PI)  ;
    return angle;
  } else return 0;
};

var randomArray = function(array){
  var index = randomBetween(0, array.length-1);
  return array[index];
};
