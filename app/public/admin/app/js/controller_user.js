'use strict';

/* Controllers */
function UserCtrl ($scope, $location, $routeParams, User){
	
	$scope.user = {};
	$scope.users = {companies:''};
	$scope.companies = {};
	$scope.form = {};

	$scope.addUser = function(params){
		console.log($scope.form);
		User.addUser($scope.form, function(user){
			if (user) {
				console.log(user);
				$location.path('/users');
			};
		});
	}

	$scope.deleteUser = function(user){
		var ok = confirm('Deseja realmente excluir esse usuario?');
		if(!ok){
			return;
		}

		console.log('delete>>',user);
		User.deleteUser(user, function(data){
			$scope.getAll();
			$location.path('/users');
		});
	}

	$scope.editUser = function(params){

		console.log('params>>', params, $scope.form);
		User.editUser(params, $scope.form, function(data){
			console.log(data)
			alert('Usuário salvo com sucesso!');
	  	$scope.getAll();
	  	$location.path('/users');
	});
	}

	$scope.getUser = function(){
		var id = $routeParams.id;
		console.log($routeParams)
		$scope.form = {};

		User.getUser(id, function(user){
			$scope.user = user;
			console.log('user>', $scope.user);
		});
	}

	$scope.getCompanies = function(){
		User.getCompanies(function(companies){
			if(companies){
				console.log('companies>', companies);
				$scope.companies = companies;
			}
		});
	}

	$scope.filterCompany = function(companyName){
		if(typeof(companyName) =='string'){
			var type = companyName.split(':')[0];
			var name = '';
			if(type != 'user'){
				name = companyName;
			}
			return name;
		}else{
			return companyName;
		}
		
	}

	$scope.getAll = function(){
		User.getAll(function(data){
			console.log('data>>>>>>', data);
			if (data) {
				$scope.users = data;
			};
		});
	}


}
UserCtrl.$inject = ['$scope', '$location', '$routeParams', 'User'];