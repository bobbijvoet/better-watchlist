module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else if (req.is('json')) {
			res.send(401, { error: 'Not authorized you fool.' });
		} else {
			res.redirect('/login');
		}
	}
};