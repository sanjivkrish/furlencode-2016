'use strict';

angular.module('nightOwlApp')
.controller('MainCtrl', function ($scope, $location, locationInfo) {
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
		console.log($scope.userPlace);
		locationInfo.setUserPlace($scope.userPlace);
		$scope.initializeMap($scope.userPlace.geometry.location.lat(), $scope.userPlace.geometry.location.lng(), 15);
	};

	//
  //Passing Latitude, longitude and Zoom value as an argument to get that location
  //
  $scope.initializeMap = function (lat, lng, zoomValue) {
      var myCenter = new google.maps.LatLng(lat, lng);
      var mapProp = {
          center: myCenter,
          zoom: zoomValue,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapProp);
      var marker = new google.maps.Marker({
          position: myCenter
      });
      marker.setMap(map);
  };
});
