var messageModel = require ('../models/message.js');

exports.init = function(io) {
	var currentUsers = 0; // keep track of the number of users

  // When a new connection is initiated
	io.sockets.on('connection', function (socket) {
        ++currentUsers;
		console.log('a user connected');
        socket.on('new user', function(msg, callback){
            console.log(nicknames);
          if (nicknames.indexOf(msg) != -1) { // making sure that the username isn't already in use
            callback(false);
          }
          else {
            callback(true);
            
            socket.nickname = msg;
            nicknames.push(socket.nickname);
            io.sockets.emit('usernames', nicknames);
          }
        });
        // socket.emit('players', { number: currentUsers});
		socket.on('chat message', function(msg){
            console.log(socket.nickname);
            console.log(msg);
		  	io.sockets.emit('chat message', { msg: msg, user: socket.nickname});
		  
		});
        socket.on('disconnect', function(data){
            if (!socket.nickname) {
                return;
            }
            else{
                nicknames.splice(nicknames.indexOf(socket.nickname), 1);
                updateNicknames();
                io.sockets.emit('user left', {user: socket.nickname});
        }
        function updateNicknames() {
            io.sockets.emit('usernames', nicknames);
        }

    })
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

