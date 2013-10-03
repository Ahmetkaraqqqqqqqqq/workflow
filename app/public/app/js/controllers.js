'use strict';

/* Controllers */
function AppCtrl ($rootScope, $scope, $location, Task){
	$scope.form = {};
	$scope.tasks = {};

	$scope.add = function(params){
		console.log("I'm here", params);
		Task.add($scope.form, function(task){
		  	$location.path('/');
		});
	}

	$scope.all = function(){
		Task.all(function(tasks){
			console.log('monter',tasks);
			$scope.tasks = tasks;
		});
	}
}
AppCtrl.$inject = ['$rootScope', '$scope', '$location', 'Task'];