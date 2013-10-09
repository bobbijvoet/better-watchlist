module.exports = function () {


	return {
		index: [
			function (req, res, next) {
				res.render('index', { user: req.user });
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