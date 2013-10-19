'use strict';

/* Services */
var module = angular.module('nsApp.services', []).
value('version', '0.1').
value('name', 'Arrange');

angular.module('nsApp.services.user', []).factory('User', ['$http', function ($http)
{
	var User = {};

	User.add = function(params, callback){
		console.log("User.signup on services_users.js");
		$http.post('/a/users/signup', params).success(function (data){
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
		console.log("User.login on services_users.js");
		$http.post('/a/users/login', params)
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

	User.logout = function(params, callback){
		console.log("User.logout on services_users.js");
		$http.get('/a/users/logout', params)
			 .success(function (data){
			 	console.log("logout efetuado com sucesso");
				if (data.error === undefined) {
					if (typeof callback == 'function') {
						callback(data);
					}
				} else{
					callback({});
				}
			 })
			 .error(function (data){
			 	console.log("erro ao tentar efetuar o logout");
			 });
	}

	return User;
}]);