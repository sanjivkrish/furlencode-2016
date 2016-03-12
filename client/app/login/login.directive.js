'use strict';

angular.module('nightOwlApp')
  .directive('login', function () {
    return {
      templateUrl: 'app/login/login.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $http, userInfo) {
      	$scope.userInfo = userInfo;

		var user = {}; //To store the information about the user
		var userinfo = {}; //Json object to receive the user details
		var acToken; //Google authentication token

		var OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
		var VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
		var SCOPE       =   'email';
		var CLIENTID    =   '836327179429-ejun0va5rgf7s2dk86pruls9s032teqp.apps.googleusercontent.com';
		var REDIRECT    =   'http://localhost:9000/';
		var TYPE        =   'token';
		var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID +
							'&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;

		//To Construct token for authentication
		$scope.login = function () {
		    var win         =   window.open(_url, "windowname1", 'width=800, height=600'); 
		    var pollTimer   =   window.setInterval(function() { 
			    try {
			        if (win.document.URL.indexOf(REDIRECT) != -1) {
			            window.clearInterval(pollTimer);
			            var url =   win.document.URL;
			            acToken =   gup(url, 'access_token');
			            win.close();
			            validateToken(acToken);
			        }
			    } catch(e) {
			    }
		    }, 100);
		};

		//Validating the access token
		function validateToken(token) {
		    $http.get(VALIDURL + token)
		        .success(function(responseText){  
		            console.log('verified User');
		            getUserInfo();
		        })
		        .error(function (err) {
		        	console.log(err);
		        })
		}

		//To structure the url
		function gup(url, name) {
		    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
		    var regexS = "[\?&#]"+name+"=([^&#]*)";
		    var regex = new RegExp( regexS );
		    var results = regex.exec( url );
		    if( results == null )
		        return "";
		    else
		        return results[1];
		}

		//Getting the details of the user
		function getUserInfo() {
		    $http.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken)
		        .success( function(resp) {
		            $scope.userInfo = resp; //Receiving the user information
		            console.log($scope.userInfo);
		        })
		        .error(function (err) {
		        	console.log(err);
		        });
	  	}

	  	//Deleting the cookie
		$scope.logout = function () {
			$scope.userInfo = {};
		    $http.get("https://accounts.google.com/o/oauth2/revoke?token="+acToken)
		            .success(function(responseText){  
		                $scope.userInfo = {};
		            })
		            .error(function (err) {
		            	console.log(err);
		            }) 
		};
      }
    };
  });