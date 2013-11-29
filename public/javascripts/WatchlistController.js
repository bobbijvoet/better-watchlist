var WatchListController = BetterWatchList.controller('WatchlistController', function ($scope, WatchlistService, $localStorage) {

	console.log('go controlla');
	$scope.$storage = $localStorage;

	$scope.movies = WatchlistService.getList();


	$scope.setWatched = function(id){

		WatchlistService.setWatched(id);
	}


});


