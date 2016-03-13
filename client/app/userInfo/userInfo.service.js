'use strict';

angular.module('nightOwlApp')
  .service('userInfo', function () {
    var userInfo = {
    	data : {}
    };

    //
    // returns user information
    //
	userInfo.getInfo = function () {
		return userInfo.data;
	};

	//
	// Set the user information
	//
	userInfo.setInfo = function (val) {
		userInfo.data = val;
	};
    return userInfo;
  });
