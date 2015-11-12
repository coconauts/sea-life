
var ws = require("nodejs-websocket");

var connections = {};

var server = ws.createServer(function (conn) {

  var connectionId = conn.key;

    console.log("New connection: " +connectionId);

     connections[connectionId] = {
       id: connectionId,
       created: new Date().getTime(),
     };
    console.log("Total connections " + Object.keys(connections).length);
    sendJson(conn, {type: "connection", value:connectionId});

    var sendAllPlayers = function() {
      //console.log("Sending position for "+ Object.keys(connections));
      for (var c in connections){
        var connection = connections[c];
        //console.log("Sending position for "+ connection.id);
        //Return position of all players except himself

        if (connection.id != connectionId) {
          sendJson(conn, {type: "fish", fish: connection.fish});
        }
      }
    };
    var interval;
    interval = setInterval(sendAllPlayers,100);

    conn.on("text", function (str) {
        //console.log("Received "+str);
        var json = JSON.parse(str);
        switch(json.type) {
          case "update":
            try{
              connections[json.connection].fish = json.fish;
            //  sendAllPlayers();
            } catch(e) {
              console.error("Unable to update fish ", json, e);
            }
          break;
          default: console.error("Unrecognized command "+str);
        }
    });

    conn.on("close", function (code, reason) {
        console.log("Connection closed ", connectionId);

        delete connections[connectionId];
        console.log("Total connections " + Object.keys(connections).length);
        if (interval) clearInterval(interval);
    });

}).listen(8001);

console.log("Websocket server started");

var sendJson = function(conn, json){
  conn.sendText(JSON.stringify(json));
};
