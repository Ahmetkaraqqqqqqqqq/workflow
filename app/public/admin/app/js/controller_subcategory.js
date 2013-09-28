'use strict';

/* Controllers */
function SubCategoryCtrl ($scope, $routeParams, $location, Subcategory, Config){


	$scope.subcategories = {};
	
	Config.get(function(data){
		$scope.categories = [
			{id : data.sambavideos.categories.hardnews_id, name : 'Hard News'},
			{id : data.sambavideos.categories.archive_id, name : 'Archive'},
			{id : data.sambavideos.categories.compilations_id, name : 'Compilations'}
		]

	});
	
	
	$scope.get = function(){
		var id = $routeParams.id;
		
		var params = {}

		if('id' in $routeParams){
			params = {
				id : $routeParams.id
			}
		}
		
		Subcategory.get(params, function(subcategory){
			if('id' in $routeParams){
				$scope.subcategory = subcategory[0];
			}else{
				$scope.subcategories = subcategory;
			}
			console.log('subcateogry>', $scope.subcategory);
		});
		
	}

	$scope.save = function(params){
		console.log(params);
		params.name = params.descriptions.pt.name;
		Subcategory.save(params, function(data){
			alert('Categoria salvo com sucesso!');
		});
	}

	$scope.delete = function(params){
		var ok = confirm('Deseja realmente excluir essa subcategoria?');
		if(!ok){
			return;
		}
		console.log('delete :> ',params);

		Subcategory.delete(params, function(data){
			$scope.get();
			$location.path('/subcategories');
		});
	}
}
SubCategoryCtrl.$inject = ['$scope', '$routeParams', '$location', 'Subcategory', 'Config'];