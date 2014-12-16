var dbRoutes = require('./routes/dbRoutes'); 
var messageRoutes = require('./routes/serverSocket.js');
var express = require('express');
var morgan = require('morgan');
var bson = require('bson');


  // app = express();

// app.get('/:collection/:operation', dbRoutes.modify);

// nicknames = [];
// /*1*/ var httpServer = http.Server(self.app);
// /*2*/ var sio =require('socket.io');
// /*3*/ var io = sio(httpServer);
// /*4*/ httpServer.listen(port, ipaddress);



var SimpleStaticServer = function() {
    nicknames = [];
    var self = this;  
    self.app = express();
    var http = require('http');
    var httpServer = http.Server(self.app);
    var sio =require('socket.io');
    var io = sio(httpServer);
    messageRoutes.init(io);
    // var io = require('socket.io').listen(http)
    // Set the views directory
    self.app.set('views', __dirname + '/views');
    // Define the view (templating) engine
    self.app.set('view engine', 'ejs');
    // Log requests
    self.app.use(morgan('tiny'));

    // Handle static files
    self.app.use(express.static(__dirname + '/public'));
    self.app.use(morgan('[:date] :method :url :status')); // Log requests
  
  // start the server
  self.start = function() {
  
     self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
     self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8000;
     self.host      = process.env.OPENSHIFT_MONGODB_DB_HOST;

     console.log('host'+ self.host);

    
    httpServer.listen(self.port, self.ipaddress);
  };
}; 


 var sss = new SimpleStaticServer();
 sss.start();
