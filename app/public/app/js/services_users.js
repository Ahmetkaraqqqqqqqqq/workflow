'use strict';

/* Services */
var module = angular.module('nsApp.services', []).
value('version', '0.1').
value('name', 'Arrange');

angular.module('nsApp.services.user', []).factory('User', ['$http', function ($http)
{
	var User = {};

	User.add = function(params, callback){
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

	User.updateUser = function(params, callback){
		$http.post('/a/users/updateUser', params).success(function (data){
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

	User.forgotPassword = function(params, callback){
		console.log("forgotPassword on services");
		$http.post('/a/users/forgotpassword', params)
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
			 	console.log("erro ao tentar resetar a senha");
			 });
	}

	User.logout = function(params, callback){
		$http.get('/a/users/logout', params)
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
			 	console.log("erro ao tentar efetuar o logout");
			 });
	}

	User.getUser = function(params, callback){
		$http.get('/a/users/getUser', params, callback)
			 .success(function (data){
			 	callback(data);
			 })
			 .error(function (data){
			 	callback(null);
			 });
	}

	return User;
}]);