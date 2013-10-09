var config = require('./../../config/development');

var io = require('socket.io');

module.exports = function (app, server) {
	var passport = require('passport');

	var PassportMiddleware = require('../middleware/Passport');
	var ListImporterMiddleware = require('../middleware/ListImporterMiddleware');
	var HomeController = require('../controllers/HomeController')();
	var MovieListController = require('../controllers/MovieListController')();
	var AdminController = require('../controllers/AdminController')();

	app.get('/', HomeController.index);

	app.get('/login', AdminController.login);
	app.post('/login', passport.authenticate('local', {
		successRedirect: '/admin',
		failureRedirect: '/login',
		failureFlash: true })
	);
	app.get('/logout', AdminController.logout);

	app.get('/admin', PassportMiddleware.ensureAuthenticated, AdminController.index);

//	app.post('/ads/push', PassportMiddleware.ensureAuthenticated, MovieListsController);

	app.post('/list/import', ListImporterMiddleware.processList);
	app.get('/list/:id',MovieListController.getList);



	app.get('/tpl/table',HomeController.tableTemplate);
	app.get('/tpl/grid',HomeController.gridTemplate);




	app.use(app.router);
};