var messageModel = require ('../models/message.js');

exports.init = function(io) {
	var currentUsers = 0; // keep track of the number of users

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
    // decided against doing server side requests, as everything can be handled from the client-side. also, by doing server to server requests from a users input isn't safe and could cause problems later
}

