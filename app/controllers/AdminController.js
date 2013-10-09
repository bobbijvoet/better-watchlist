var ads = require('./../models/ads')
	, io = require('socket.io');

module.exports = function () {
	return {
		index: [
			function (req, res, next) {
				res.render('admin', {ads: ads});
			}],
		login: [
			function (req, res, next) {
				res.render('login', { user: req.user, message: req.flash('error') });
			}
		],
		logout: [
			function (req, res, next) {
				req.logout();
				res.redirect('/');
			}
		]
		,push: [
			function (req, res, next) {
				io = require('./../lib/socketio').getSocket();

				var ad = ads[req.body.index];

				io.sockets.emit('update', ad);
				var clients = io.sockets.clients();

				var response = {
					clientCount: clients.length
				}
				res.json(response);
			}]
	};
};

