exports.init = function(io) {
	var currentPlayers = 0; // keep track of the number of players

  // When a new connection is initiated
	io.sockets.on('connection', function (socket) {
		console.log('a user connected');
		socket.on('chat message', function(msg){
			console.log("msg");
		  io.sockets.emit('chat message', msg);
		});
	});
	

}
