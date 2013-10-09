var ListGetterController = BetterWatchList.controller('ListGetter', ['$scope', '$http', function ($scope, $http) {

	$scope.listUrl = 'http://www.imdb.com/list/PIca5-_2p5Q';

	$scope.submitListUrl = function (e) {

		$http({
			url: 'list/import',
			method: "POST",
			data: {listUrl: $scope.listUrl},
			headers: {'Content-Type': 'application/json'}
		}).success(function (data, status, headers, config) {

				location.href = '/list/' + data.listid;
			}
		);
	}
}]);

