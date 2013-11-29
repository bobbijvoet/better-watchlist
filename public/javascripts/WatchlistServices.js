var WatchlistServices = angular.module('WatchlistServices', ['ngStorage']);

WatchlistServices.factory('WatchlistService', function ($window, $rootScope, $http, $q, $localStorage /*,PlaylistService*/) {
	var WatchlistService = {},
		list=movies.entries;

	$localStorage.watched = $localStorage.watched || [];
	WatchlistService.getList = function(){

		for(index in $localStorage.watched) {

			console.log($localStorage.watched[index]);

			_.findWhere(list,{imdbID: $localStorage.watched[index]}).watched = true;
		}


		return list;
	}


	WatchlistService.setWatched = function(imdbID){

		_.findWhere(list,{imdbID: imdbID}).watched = !_.findWhere(list,{imdbID: imdbID}).watched;

		if(_.findWhere(list,{imdbID: imdbID}).watched) {
			$localStorage.watched.push(imdbID);
		} else {
			$localStorage.watched = _.without($localStorage.watched, imdbID);
		}

		WatchlistService.getList

		console.log($localStorage.watched);

		$rootScope.$apply();

//		$rootScope.$emit('playerStateChange');



	};

	return WatchlistService;
});


