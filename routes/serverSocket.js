var messageModel = require ('../models/message.js');

exports.init = function(io) {
	var currentPlayers = 0; // keep track of the number of players

  // When a new connection is initiated
	io.sockets.on('connection', function (socket) {
		console.log('a user connected');
		socket.on('chat message', function(msg){
		  	io.sockets.emit('chat message', msg);
		  
		});
	});
	

}


exports.checkMessage = function(request, response) {
    console.log("the check message method in message.js was hit");
    // tennisArray.push({request.params.player_name, request.params.handed, request.params.ranking})
    // var tennisArray = tennisModel.getArray();
    // console.log("successful call to the getArray method from routes");

    var checkMessage = messageModel.checkMessage(request.params.message);
    response.send(checkMessage);
    // console.log("this is the get player: " + JSON.stringify(getPlayer.length));
    // response.render('index', { 'message': getPlayer });
    // response.send(tennisArray);
}

exports.getSoundcloudUrl = function(request, response) {

 //    response.writeHead(200, {
 //                 'Content-Type': 'text/html',
 //                 'Access-Control-Allow-Origin' : '*'});

	// console.log("YES this is best case, I DID IT!! - getSoundcloudUrl in message models")
    // request({
    //     uri: "http://www.paulokuda.com",
    //     }, function(error, response, body) {
    //     console.log(body);
    // });
    
    
    // console.log("this is the get player: " + JSON.stringify(getPlayer.length));
    // response.render('index', { 'message': getPlayer });
    // response.send(tennisArray);
}

