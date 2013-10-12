'use strict';

/* Services */
var module = angular.module('nsApp.services', []).
value('version', '0.1').
value('name', 'Arrange');

angular.module('nsApp.services.user', []).factory('User', ['$http', function ($http)
{
	var User = {};

	User.add = function(params, callback){
		$http.post('/a/users/singup', params).success(function (data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} else{
				callback({});
			}
		});
	}

	User.login = function(params, callback){
		$http.post('/a/users/singin', params).success(function (data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} else{
				callback({});
			}
		});
	}

	return User;
}]);