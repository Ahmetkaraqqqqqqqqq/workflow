//'use strict';
// Declare app level module which depends on filters, and services
angular.module('nsApp', [
	//Providers
	'nsApp.filters', 
	'nsApp.services.task', 
	'nsApp.services.user',
	'nsApp.directives',

	]).config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/index.html'
		});

		$routeProvider.when('/tasks/new', {
			templateUrl: 'partials/add_task.html'
		});

		$routeProvider.when('/users/singup', {
			templateUrl: 'partials/singup.html',
			controller: 'UserCtrl'
		});

		$routeProvider.when('/users/account', {
			templateUrl: 'partials/profile.html'
		});

		$routeProvider.when('/users/singin', {
			templateUrl: 'partials/singin.html',
			controller: 'UserCtrl'
		});

		$routeProvider.otherwise({
			redirectTo: '/'
		});
		$locationProvider.html5Mode(false);
	}]);
