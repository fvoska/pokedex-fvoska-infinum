var config = require('./config.js');
var express = require('express');
var http = require('http');

var app = express();

// Serve client.
app.use(express.static('client'));

// For refreshing.
app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile(__dirname + '/client/index.html');
});

// Set compression.
if (config.useCompression) {
  var compression = require('compression');
  app.use(compression());
}

var httpListener = http.createServer(app).listen(config.httpPort, config.listenAddress, function() {
  console.log('Listening on ' + httpListener.address().address + ':' + httpListener.address().port);
});
