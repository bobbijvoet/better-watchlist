var _ = require('lodash'),
	url = require('url'),
	fs = require('fs'),
	path = require('path');


module.exports = function () {


	return {
		getList: [
			function (req, res, next) {
				var context = {};

				var localListPath = path.join(__dirname, './../../private/');

				fs.readFile(localListPath + 'json/' + req.params.id + '.json', {encoding: 'utf8'}, function (err, data) {
					if (err) {
						console.log(err);
						res.redirect('/');
					} else {
						var list = JSON.parse(data);
						res.render('list', {list: list.entries, title: list.originalId, listString: JSON.stringify(list)});

					}
				})

			}]


	};
};