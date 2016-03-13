'use strict';

angular.module('nightOwlApp')
  .service('userInfo', function () {
    var userInfo = {
    	data : {}
    };

	userInfo.getInfo = function () {
		return userInfo.data;
	};

	userInfo.setInfo = function (val) {
		userInfo.data = val;
	};
    return userInfo;
  });
