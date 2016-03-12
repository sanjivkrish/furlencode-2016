'use strict';

angular.module('nightOwlApp')
  .service('locationInfo', function () {
    var locationInfo = {};

    locationInfo.userPlace = '';

    locationInfo.setUserPlace = function (data) {
    	locationInfo.userPlace = data;
    };

    locationInfo.getUserPlace = function () {
    	return locationInfo.userPlace;
    }

    return locationInfo;
  });
