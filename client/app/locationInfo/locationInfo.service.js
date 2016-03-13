'use strict';

angular.module('nightOwlApp')
  .service('locationInfo', function () {
    var locationInfo = {};

    locationInfo.userPlace = '';

    //
    // set user location info
    //
    locationInfo.setUserPlace = function (data) {
    	locationInfo.userPlace = data;
    };

    //
    // Get user location info
    //
    locationInfo.getUserPlace = function () {
    	return locationInfo.userPlace;
    }

    return locationInfo;
  });
