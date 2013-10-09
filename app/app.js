var express = require('express')
	, http = require('http')
	, path = require('path')
	, hbs = require('express-hbs')
	, io = require('socket.io');

/*
 var nconf = require('nconf');

 // First consider commandline arguments and environment variables, respectively.
 nconf.argv().env();

 // Then load configuration from a designated file.
 nconf.file({ file: 'config.json' });

 // Provide default values for settings not provided above.
 nconf.defaults({
 'http': {
 'port': 1337
 }
 });
 */


var app = express();

require('./lib/middleware')(app);

require('./lib/passport')(app);

var uid = parseInt(process.env.SUDO_UID);
// Set our server's uid to that user
if (uid) process.setuid(uid);
console.log('Server\'s UID is now ' + process.getuid());

var server = http.createServer(app);
require('./lib/routes')(app, server);

var uid = parseInt(process.env.SUDO_UID);
// Set our server's uid to that user
if (uid) process.setuid(uid);
console.log('Server\'s UID is now ' + process.getuid());

server.listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));

	// Find out which user used sudo through the environment variable


});
//require('./lib/socketio')(server);


//var socket = require('./lib/socketio');
//
//socket.startSocketServer(server);




