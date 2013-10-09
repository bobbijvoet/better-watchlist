module.exports = function () {


	return {
		index: [
			function (req, res, next) {
				res.render('index', { title:'import a imdb watchlist' });
			}],
		tableTemplate: [
			function (req, res, next) {
				return res.render('partials/table');
			}],
		gridTemplate: [
			function (req, res, next) {
				return res.render('partials/grid');
			}]

	};
};