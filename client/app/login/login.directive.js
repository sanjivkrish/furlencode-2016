'use strict';

angular.module('nightOwlApp')
  .directive('login', function () {
    return {
      templateUrl: 'app/login/login.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });