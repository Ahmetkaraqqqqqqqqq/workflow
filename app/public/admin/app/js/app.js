'use strict';

// Declare app level module which depends on filters, and services
angular.module('admin_nsApp', [
	//Providers
	'admin_nsApp.filters', 
	'admin_nsApp.services.user',
	'admin_nsApp.services.company',
	'admin_nsApp.services.subcategory',
	'admin_nsApp.services.requestcontent',
	'admin_nsApp.services.group',
	'admin_nsApp.services.content',
	'admin_nsApp.services.securitygroups',
	'admin_nsApp.services.config',
	'admin_nsApp.directives',
	'decipher.tags', 

	// providers angular-90
	'ui.bootstrap',
	'ui.bootstrap.typeahead'

	]).config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.when('/users', {
			templateUrl: 'partials/users.html',
			controller: 'UserCtrl'
		});

		$routeProvider.when('/users/singin', {
			templateUrl: 'partials/singin.html',
			controller: 'UserCtrl'
		});

		$routeProvider.when('/users/singup', {
			templateUrl: 'partials/singup.html',
			controller: 'UserCtrl'
		});

		$routeProvider.when('/users/account', {
			templateUrl: 'partials/profile.html',
			controller: 'UserCtrl'
		});

		$routeProvider.when('/users/:id', {
			templateUrl: 'partials/edit_user.html',
			controller: 'UserCtrl'
		});

		$routeProvider.when('/companies', {
			templateUrl: 'partials/companies.html', 
			controller: 'CompanyCtrl'
		});

		$routeProvider.when('/companies/add', {
			templateUrl: 'partials/add_company.html', 
			controller: 'CompanyCtrl'
		});

		$routeProvider.when('/companies/:id', {
			templateUrl: 'partials/edit_company.html',
			controller: 'CompanyCtrl'
		});

		$routeProvider.when('/groups', {
			templateUrl: 'partials/groups.html',
			controller: 'GroupCtrl'
		});

		$routeProvider.when('/groups/add', {
			templateUrl: 'partials/add_group.html',
			controller: 'GroupCtrl'
		});

		$routeProvider.when('/groups/:id', {
			templateUrl: 'partials/edit_group.html',
			controller: 'GroupCtrl'
		});

		$routeProvider.when('/subcategories', {
			templateUrl: 'partials/subcategories.html',
			controller: 'SubCategoryCtrl'
		});

		$routeProvider.when('/subcategories/add', {
			templateUrl: 'partials/add_subcategory.html',
			controller: 'SubCategoryCtrl'
		});

		$routeProvider.when('/subcategories/:id', {
			templateUrl: 'partials/edit_subcategory.html',
			controller: 'SubCategoryCtrl'
		});

		$routeProvider.when('/contents', {
			templateUrl: 'partials/content.html',
			controller: 'ContentCtrl'
		});

		$routeProvider.when('/publish_content', {
			templateUrl: 'partials/publish_content.html',
			controller: 'ContentCtrl'
		});

		$routeProvider.when('/request_content', {
			templateUrl: 'partials/request_content.html',
			controller: 'RequestContentCtrl'
		});

		$routeProvider.when('/forbiden', {
			templateUrl: 'partials/forbiden.html'
		});

		$routeProvider.otherwise({
			redirectTo: '/forbiden'
		});
		$locationProvider.html5Mode(false);
	}]);
