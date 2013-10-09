config = require('./../../config/development');

var express = require('express')
	, http = require('http')
	, path = require('path')
	, flash = require('connect-flash')
	, hbs = require('express-hbs')
	, _ = require('lodash');

module.exports = function (app) {


	/*Dev settings*/
	app.configure('development', function () {
		//app.set('db uri', 'localhost/dev');
		app.use(express.logger('dev'));
	})

	/*Production settings*/
	app.configure('production', function () {
		//app.set('db uri', 'n.n.n.n/prod');
	});

	app.set('port', process.env.PORT || config.app.port);

	/*View engine*/
	app.engine('jade', require('jade').__express);
	app.set('view engine', 'jade');
	app.set('views', __dirname + './../views');



	/*Main node middleware*/
	app.use(express.bodyParser());
	app.use(express.cookieParser('This is the secret.'));
	app.use(express.methodOverride());
	app.use(flash());
	app.use(express.favicon());
	app.use(express.session({ secret: config.app.sessionSecret, cookie: { maxAge: config.app.sessionMaxAge } }));
	app.use(express.static(path.join(__dirname, './../../public')));

}