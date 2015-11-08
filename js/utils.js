var randomBetween = function(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
};

var floatRandomBetween = function(min, max){
  var f = Math.random() * (max - min) + min;
  return parseFloat(f.toFixed(2));
//  var rounded = ""+parseInt(f * 100) / 100;
//  return rounded;
};

var distance =  function(x, y, x0, y0){
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};
