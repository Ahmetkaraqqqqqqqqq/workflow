//'use strict';
// Declare app level module which depends on filters, and services
angular.module('nsApp', [
	//Providers
	'nsApp.filters', 
	'nsApp.services.task', 
	'nsApp.directives',

	]).config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/index.html'
		});

		$routeProvider.when('/tasks/new', {
			templateUrl: 'partials/add_task.html'
		});

		$routeProvider.otherwise({
			redirectTo: '/'
		});
		$locationProvider.html5Mode(false);
	}]);
