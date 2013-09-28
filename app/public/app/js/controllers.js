'use strict';

/* Controllers */
function AppCtrl ($rootScope, $scope, $location, User){
	$rootScope.config = {};
	$rootScope.loading = false;
	$scope.user = {company:''};
	$rootScope.lang = '';
	$scope.myuser = {};
}
AppCtrl.$inject = ['$rootScope', '$scope', '$location', 'User'];