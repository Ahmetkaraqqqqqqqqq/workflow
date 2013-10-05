'use strict';

/* Controllers */
function AppCtrl ($rootScope, $scope, $location, Task){
	$scope.form = {};
	$scope.tasks = {};
	$scope.todo = {};
	$scope.doing = {};
	$scope.done = {};

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

	$scope.findTodo = function(){
		var params = {
			status : 'todo'
		};

		Task.find(params, function(tasks){
			console.log('monter',tasks);
			$scope.todo = tasks;
		});
	}

	$scope.findDoing = function(params){
		var params = {
			status : 'doing'
		};

		Task.find(params, function(tasks){
			console.log('monter',tasks);
			$scope.doing = tasks;
		});
	}

	$scope.findDone = function(params){
		var params = {
			status : 'done'
		};

		Task.find(params, function(tasks){
			console.log('monter',tasks);
			$scope.done = tasks;
		});
	}
}
AppCtrl.$inject = ['$rootScope', '$scope', '$location', 'Task'];