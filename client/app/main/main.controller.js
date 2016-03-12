'use strict';

angular.module('nightOwlApp')
.controller('MainCtrl', function ($scope, $location, $http, locationInfo) {
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
		$scope.getShopInfo($scope.userPlace.geometry.location.lat(), $scope.userPlace.geometry.location.lng());
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

	//
  // This function is triggered when user searches for the location
  //
  $scope.getShopInfo = function (lat, lng) {
      $http.get('https://api.foursquare.com/v2/venues/explore?ll=' + lat + ',' + lng +
      '&oauth_token=2NTXCBLHM4A1P52VKVXYXQLFVSGMPGVLHGDZL4PTPNWZI2IR&v=20150528')
	      .success(function (data) {
	          $scope.suggestedHotels = data.response.groups[0].items;
	          console.log($scope.suggestedHotels);
	      })
	      .error(function (data) {
	          console.log('error in foursquare API');
	      });
  };
});
