//module.exports = function (server) {
//	if(server){
//		io = require('socket.io').listen(server);
//	}
//	return io;
//}


var socketio = require('socket.io'),
	io, clients = {};

module.exports = {

	startSocketServer: function (app) {
		io = socketio.listen(app);

		io.configure('development', function () {
			io.set('transports', ['xhr-polling']);
			io.enable('browser client etag');
			io.set('browser client gzip', true);
			io.enable('browser client minification');
		});

		io.configure('production', function () {
			io.enable('browser client minification');  // send minified client
			io.enable('browser client etag');          // apply etag caching logic based on version number
			io.set('log level', 1);                    // reduce logging
			io.set('transports', [                     // enable all transports (optional if you want flashsocket)
				'websocket'
				, 'flashsocket'
				, 'htmlfile'
				, 'xhr-polling'
				, 'jsonp-polling'
			]);
		});
		//

		io.sockets.on('connection', function (socket) {
			console.log("new connection: " + socket.id);

			socket.on('disconnect', function () {
				console.log("device disconnected");

			});

			socket.on('connect_device', function (data, fn) {
				console.log("data from connected device: " + data);
				for (var col in data) {
					console.log(col + " => " + data[col]);
				}
			});
		});
	}
	,getSocket :function(){
		return io;
	}
};
