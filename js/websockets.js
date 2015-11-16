var ws = new Websocket();

function Websocket() {
  var connection;
  var connectionId;
  var connected = false;

  if ("WebSocket" in window) {
     console.log("Opening websocket!");
     connection = new WebSocket("ws:/sealife.coconauts.net:8001/echo");
     connected= true;

     connection.onopen = function(){
        console.log("Websocket connection opened...");
     };

     connection.onmessage = function (evt){
        var json = JSON.parse(evt.data);
        //console.log("Received message ",json);

        switch(json.type) {
          case "connection":
             connectionId = json.value;
             console.log("Connected to server with id " + connectionId);
             break;
          case 'fish': if(json.fish) online.update(json.fish);
          break;
          default: console.log("Message not recognized " + evt.data);
        }
     };

     connection.onclose = function() {
        console.log("Connection is closed.");
     };
  } else console.log("WebSocket NOT supported by your Browser!");

  this.send = function(json){
    json.connection = connectionId;
    //console.log("Sending",json, connection);
    try {
      connection.send(JSON.stringify(json));
    } catch (e) {
      console.error("Unable to send ", json, e);
    }
  };
}
