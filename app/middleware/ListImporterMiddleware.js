var csv = require('csv'),
	_ = require('lodash'),
	request = require('request'),
	crypto = require('crypto'),
	url = require('url'),
	fs = require('fs'),
	path = require('path');

module.exports = {
	processList: function (req, res, next) {
		var localListPath = path.join(__dirname, './../../private/'),
			listId = ''
			;

		//Get list url from requestbody
		var listUrl = req.body.listUrl || 'http://www.imdb.com/list/PIca5-_2p5Q/';
		var listProvider = 'imdb';

		if (listUrl) {
			listId = url.parse(listUrl).pathname;
			listId = listId.substring(listId.lastIndexOf("/") + 1, listId.length);
		}

		var listIdHash = crypto.createHash('md5').update(listProvider + listId).digest("hex");

		//Check if list id .json exists in filesystem
		fs.exists(localListPath + 'json/' + listIdHash + '.json', function (exists) {
			if (exists) {
				//Local .json list exists
				fs.readFile(localListPath + 'json/' + listIdHash + '.json', {encoding: 'utf8'}, function (err, data) {
					if (err) {
						console.log(err);
						return res.json({success: false});
					} else {
						return res.json({success: true, listid: listIdHash});
					}
				})
			} else {
				//New list, fetch it.
				var csvPath = 'http://www.imdb.com/list/export?list_id=' + listId + '&author_id=ur12341234';

				//Generate defer function
				var requestMovieInfo = function (id) {
					var deferred = Q.defer();
					request('http://www.omdbapi.com/?i=' + id, function (error, response, body) {
						if (!error && response.statusCode == 200) {
							deferred.resolve(JSON.parse(body));
						} else {
							deferred.reject();
						}
					});
					return deferred.promise;
				}

				var Q = require('q');
				request(csvPath, function (error, response, body) {
					if (!error && response.statusCode == 200) {
						if ((response.headers['content-type']).search('text/csv') != -1) {
							csv().from(body, {
								columns: true
							}).to.array(function (data) {
								var tasks = [];

								for (var key in data) {
									tasks.push(requestMovieInfo(data[key]['const']));
								}
								var all = Q.all(tasks);
								all.done(function (data) {
									var list = {};
									list.entries = data
									list.provider = listProvider;
									list.originalId = listId;
									list.timestamp = +new Date();

									fs.writeFile(localListPath + 'json/' + listIdHash + '.json', JSON.stringify(list), function (err) {
										if (err) {
											console.log(err);
											return res.json({success: false});
										} else {
											return res.json({success: true, listid: listIdHash});
										}

									});
								});

							}, {
								columns: ['const']
							});
						}
					} else {
						console.log('ahhh');
					}
				});
			}
		})

	}

}
;