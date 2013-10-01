'use strict';

/* Controllers */
function AppCtrl ($rootScope, $scope, $location, Task){
	$scope.form = {};

	$scope.add = function(params){
		console.log("I'm here", $scope.form);
		Task.add($scope.form, function(task){
		  	$location.path('/');
		});
	}
}
AppCtrl.$inject = ['$rootScope', '$scope', '$location', 'Task'];