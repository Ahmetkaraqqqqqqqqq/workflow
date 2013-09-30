'use strict';

/* Controllers */
function AppCtrl ($rootScope, $scope, $location, Task){
	$rootScope.lang = '';
	$scope.myuser = {};

	$scope.get = function(){
		
	}
}
AppCtrl.$inject = ['$rootScope', '$scope', '$location', 'Task'];