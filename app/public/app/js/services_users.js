'use strict';

/* Services */
var module = angular.module('nsApp.services', []).
value('version', '0.1').
value('name', 'Arrange');

angular.module('nsApp.services.user', []).factory('User', ['$http', function ($http)
{
	var User = {};

	User.add = function(params, callback){
		console.log("User.singup on services_users.js");
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

	User.singin = function(params, callback){
		console.log("User.singin on services_users.js");
		$http.post('/a/users/singin/auth', params)
			 .success(function (data){
				if (data.error === undefined) {
					if (typeof callback == 'function') {
						callback(data);
					}
				} else{
					callback({});
				}
			 })
			 .error(function (data){
			 	console.log("erro ao tentar autenticar");
			 });
	}

	return User;
}]);