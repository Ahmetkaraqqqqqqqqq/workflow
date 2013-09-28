//'use strict';


// Declare app level module which depends on filters, and services
angular.module('nsApp', [
	//Providers
	'nsApp.filters', 
	'nsApp.services.user', 
	'nsApp.services.company', 
	'nsApp.services.content', 
	'nsApp.services.requestcontent', 
	'nsApp.services.category', 
	'nsApp.services.subcategory', 
	'nsApp.services.purchase', 
	'nsApp.services.accountrecovery', 
	'nsApp.services.billing', 
	'nsApp.services.config', 
	'nsApp.directives',

	]).config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/index.html'
		});

		$routeProvider.when('/events', {
			templateUrl: 'partials/events.html'
		});

		$routeProvider.when('/facilities', {
			templateUrl: 'partials/facilities.html'
		});

		$routeProvider.when('/about', {
			templateUrl: 'partials/about.html'
		});

		$routeProvider.when('/content/:id', {
			templateUrl: 'partials/content.html', 
			controller: 'ContentCtrl'
		});

		$routeProvider.when('/content', {
			templateUrl: 'partials/content_presentation.html',
			controller: 'CategoryCtrl'
		});

		$routeProvider.when('/request_content', {
			templateUrl: 'partials/request_content.html',
			controller: 'RequestContentCtrl'
		});

		$routeProvider.when('/request_success', {
			templateUrl: 'partials/request_success.html'
		});

		$routeProvider.when('/update_success', {
			templateUrl: 'partials/update_success.html'
		});

		$routeProvider.when('/contact', {
			templateUrl: 'partials/contact.html'
		});

		$routeProvider.when('/login', {
			templateUrl: 'partials/login.html'
		});

		$routeProvider.when('/signup', {
			templateUrl: 'partials/new_user.html',
			controller : 'UserCtrl'
		});

		$routeProvider.when('/myaccount',{
			templateUrl: 'partials/my_account.html'
		});

		$routeProvider.when('/recovery',{
			templateUrl: 'partials/recovery.html',
			controller : 'AccountRecoveryCtrl'
		});

		$routeProvider.when('/recovery/:token',{
			templateUrl: 'partials/recovery.html',
			controller : 'AccountRecoveryCtrl'
		});

		$routeProvider.when('/company_signup', {
			templateUrl: 'partials/new_company.html',
			controller: 'CompanyCtrl'
		});

		$routeProvider.when('/purchase', {
			templateUrl: 'partials/shoppingcart.html',
			controller: 'ShoppingCartCtrl'
		});

		$routeProvider.when('/myvideos', {
			templateUrl: 'partials/myvideos.html',
			controller: 'ShoppingCartCtrl'
		});

		$routeProvider.otherwise({
			redirectTo: '/'
		});
		$locationProvider.html5Mode(false);
	}]);
