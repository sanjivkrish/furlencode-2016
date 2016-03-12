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

  //
  // Gets the number and returns the array of same length
  //
  $scope.getNumber = function (rating) {
		return new Array(parseInt(parseInt(rating)/2));
  };

  //
  // Returns whether input is float or not
  //
  $scope.isRatingFloat = function (n) {
		return ((n === +n) && (n !== (n|0)));
  };

  //
  // Populate a map on showing directions
  //
	$scope.getDirection = function (venue) {
		$scope.initMap(venue.location.lat, venue.location.lng);
	};

  $scope.initMap = function (lat, lng) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 15,
      center: {lat: lat, lng: lng}
    });
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay, lat, lng);
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay, lat, lng) {
    directionsService.route({
      origin: {lat: $scope.userPlace.geometry.location.lat(), lng: $scope.userPlace.geometry.location.lng()},
      destination: {lat: lat, lng: lng},
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
});
