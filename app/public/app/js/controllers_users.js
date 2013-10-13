'use strict';

function UserCtrl ($rootScope, $scope, $location, User){
    $scope.form = {};
 
	$scope.greeting = 'Funciona cacete!';

    $scope.add = function(params){
		console.log("I'm here", params);
		User.add($scope.form, function(user){
		  	$location.path('/');
		});
	}

	$scope.singin = function(params){
		console.log("I'm here - scrope.singin on controllers_users.js", params);
		User.singin($scope.form, function(user){
		  	$location.path('/');
		});
	}
}

UserCtrl.$inject = ['$rootScope', '$scope', '$location', 'User'];
