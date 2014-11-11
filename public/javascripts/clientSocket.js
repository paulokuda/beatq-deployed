var socket = io.connect('/');
socket.on('players', function (data) {
  console.log("the data is: " + JSON.stringify(data));
  $("#numPlayers").text(data.number);
	});

