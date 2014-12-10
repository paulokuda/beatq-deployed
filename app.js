/*
 * In this example, I put the typical Express stuff first
 * even though I don't use it in the example.  It can serve
 * as a template for your apps if you need Express.
 * Then I put the socket.io specific stuff after
 * It doesn't need to be after, but I'm doing it this
 * way just to make it easier to differentiate the two.
 */

// Normal Express requires...
var dbRoutes = require('./routes/dbRoutes'); 
var messageRoutes = require('./routes/serverSocket.js');
var express = require('express');
var morgan = require('morgan');


  // app = express();

// app.get('/:collection/:operation', dbRoutes.modify);

// nicknames = [];
// /*1*/ var httpServer = http.Server(self.app);
// /*2*/ var sio =require('socket.io');
// /*3*/ var io = sio(httpServer);
// /*4*/ httpServer.listen(port, ipaddress);
// messageRoutes.init(io);

var SimpleStaticServer = function() {
    var self = this;  
    self.app = express();
    http = require('http').Server(self.app)
    var io = require('socket.io').listen(http)
    // Set the views directory
    self.app.set('views', __dirname + '/views');
    // Define the view (templating) engine
    self.app.set('view engine', 'ejs');
    // Log requests
    self.app.use(morgan('tiny'));

    // Handle static files
    self.app.use(express.static(__dirname + '/public'));


  
  //    self.app.use(connect(connect.basicAuth('j', 'jmjm')))
  self.app.use(morgan('[:date] :method :url :status')); // Log requests
  // self.app.use(express.static(self.path.join(__dirname, 'public'))); // Process static files



  // Start the server (starts up the sample application).
  self.start = function() {
  
     self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
     self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8000;
     self.host      = process.env.OPENSHIFT_MONGODB_DB_HOST;

     console.log('host'+ self.host);

    //  Start listening on the specific IP and PORT
    http.listen(self.port, self.ipaddress);
  };
}; 


/**
 *  main():  Main code.
 */
 var sss = new SimpleStaticServer();
 sss.start();
