var BetterWatchList = angular.module('BetterWatchList', ['ngRoute', 'ngTable'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/details', {
				templateUrl: '/tpl/table',
				controller: 'WatchlistDetailsController'
			})
			.when('/grid', {
				templateUrl: '/tpl/grid',
				controller: 'WatchlistController'
			}).otherwise({
				redirectTo: 'grid'});

	}]);
