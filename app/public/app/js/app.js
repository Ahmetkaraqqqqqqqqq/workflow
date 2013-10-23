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

		$routeProvider.when('/landing', {
			templateUrl: 'landing.html'
		});

		$routeProvider.when('/landing#about', {
			templateUrl: 'landing.html'
		});

		$routeProvider.when('/landing#features', {
			templateUrl: 'landing.html'
		});

		$routeProvider.when('/tasks/new', {
			templateUrl: 'partials/add_task.html'
		});

		$routeProvider.when('/notes', {
			templateUrl: 'partials/notes.html'
		});

		$routeProvider.when('/users/signup', {
			templateUrl: 'partials/signup.html'
		});

		$routeProvider.when('/users/account', {
			templateUrl: 'partials/profile.html'
		});

		$routeProvider.when('/users/singin', {
			templateUrl: 'partials/singin.html'
		});

		$routeProvider.when('/users/forgot_password', {
			templateUrl: 'partials/forgot_password.html'
		});

		$routeProvider.when('/users/reset_password', {
			templateUrl: 'partials/reset_password.html'
		});

		$routeProvider.otherwise({
			redirectTo: '/'
		});
		$locationProvider.html5Mode(false);
	}]);
