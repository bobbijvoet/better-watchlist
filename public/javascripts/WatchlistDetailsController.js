var WatchListController = BetterWatchList.controller('WatchlistDetailsController', function ($scope, $filter, ngTableParams) {

	console.log('go details controlla');

	$scope.tableParams = new ngTableParams({
		page: 1,            // show first page
		total: movies.entries.length, // length of data
		count: 10,           // count per page
		sorting: {
			name: 'asc'     // initial sorting
		}
	});

	// watch for changes of parameters
	$scope.$watch('tableParams', function (params) {
		// slice array data on pages
		console.log($scope.tableParams);


//		var orderedData = params.sorting ?
//			$filter('orderBy')(movies.entries, params.orderBy()) :
//			movies.entries;

		var orderedData = params.filter ?
			$filter('filter')(movies.entries, params.filter) :
			movies.entries;


		$scope.movies = orderedData.slice(
			(params.page - 1) * params.count,
			params.page * params.count
		);
	}, true);


});

