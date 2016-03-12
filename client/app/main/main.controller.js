'use strict';

angular.module('nightOwlApp')
.controller('MainCtrl', function ($scope) {
	//
	// Watch function to search box
	//
	$scope.changePlace = function () {
		if ($scope.userPlace.id) {
			$scope.placeChanged();
		}
	};

	//
	// User switched to new place
	//
	$scope.placeChanged = function () {
		console.log($scope.userPlace.id);
	};
});
