'use strict';

function UserCtrl ($rootScope, $scope, $location, User){
	$scope.form = {};

	$scope.someData = "Data to be dragged";
 
    $scope.add = function(params){
		console.log("I'm here", params);
		User.add($scope.form, function(user){
		  	$location.path('/');
		});
	}

	$scope.login = function(params){
		console.log("I'm here", params);
		User.login($scope.form, function(user){
		  	$location.path('/');
		});
	}
}
UserCtrl.$inject = ['$rootScope', '$scope', '$location', 'User'];
