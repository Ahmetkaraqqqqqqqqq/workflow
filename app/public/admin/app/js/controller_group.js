'use strict';

/* Controllers */
function GroupCtrl ($rootScope, $scope, $routeParams, $location, Group, Subcategory){
	$scope.groups = {};
	$scope.form = {};
	$scope.group = {};

	$scope.subcategories = [];
	$scope.hardnews_cat = [];
	$scope.archive_cat = [];
	$scope.compilations_cat = [];
	$scope.groupSubCats = {hardnews : [], archive:[], compilations:[]};

	(function init(){
		
		/*SECURITY GROUP LIST*/
		Subcategory.get({}, function(subcategories){
			
			$scope.subcategories = subcategories;

			for(var i = 0; i < $scope.subcategories.length; i++){

				if($scope.subcategories[i].category_id == $rootScope.config.sambavideos.categories.hardnews_id){
					$scope.hardnews_cat.push($scope.subcategories[i]);
				}
				if($scope.subcategories[i].category_id == $rootScope.config.sambavideos.categories.archive_id){
					$scope.archive_cat.push($scope.subcategories[i]);
				}
				if($scope.subcategories[i].category_id == $rootScope.config.sambavideos.categories.compilations_id){
					$scope.compilations_cat.push($scope.subcategories[i]);
				}
			}


			console.log('$scope.subcategories', $scope.subcategories, $scope.hardnews_cat);
		});

	})();

	$scope.getAll = function(){
		Group.getAll(function(groups){
			if(groups){
				console.log('groups>', groups);
				$scope.groups = groups;
			}
		});
	}

	$scope.get = function(){
		var id = $routeParams.id;
		$scope.form = {};

		Group.get(id, function(group){
			$scope.group = group[0];
			$scope.form = $scope.group;
			console.log('group>', $scope.group);

			Group.getSubcategories($scope.group.id, function(groupsubcats){

				for(var i = 0; i < groupsubcats.length; i++){

					if(groupsubcats[i].category_id == $rootScope.config.sambavideos.categories.hardnews_id){
						$scope.groupSubCats['hardnews'].push(groupsubcats[i]);
					}
					if(groupsubcats[i].category_id == $rootScope.config.sambavideos.categories.archive_id){
						$scope.groupSubCats['archive'].push(groupsubcats[i]);
					}
					if(groupsubcats[i].category_id == $rootScope.config.sambavideos.categories.compilations_id){
						$scope.groupSubCats['compilations'].push(groupsubcats[i]);
					}
				}
			});
		});
	}

	$scope.addGroup = function(params){
		console.log($scope.form);
		Group.addGroup($scope.form, function(group){
			var catsTosend = [];
			catsTosend.push($scope.groupSubCats.hardnews);
			catsTosend.push($scope.groupSubCats.archive);
			catsTosend.push($scope.groupSubCats.compilations);

			catsTosend = _.flatten(catsTosend); // transforma array, multíníveis em um único nível | _.flatten([1, [2], [3, [[4]]]]); => [1, 2, 3, 4];
			var params = {
				group_id : group.id,
				subcategories : catsTosend
			}

			Group.setSubcategories(params, function(data){
				console.log('setsubcategories', data);

				alert('Grupo salva com sucesso!');
		  		//$scope.getAll();
		  		$location.path('/groups');
			});
		});
	}

	$scope.edit = function(params){

		Group.edit($scope.form, function(group){
			
			var catsTosend = [];
			catsTosend.push($scope.groupSubCats.hardnews);
			catsTosend.push($scope.groupSubCats.archive);
			catsTosend.push($scope.groupSubCats.compilations);

			catsTosend = _.flatten(catsTosend); // transforma array, multíníveis em um único nível | _.flatten([1, [2], [3, [[4]]]]); => [1, 2, 3, 4];
			var params = {
				group_id : $scope.group.id,
				subcategories : catsTosend
			}

			Group.setSubcategories(params, function(data){
				console.log('setsubcategories', data);

				alert('Grupo salva com sucesso!');
		  		//$scope.getAll();
		  		$location.path('/groups');
			});
		});
	}

	$scope.deleteGroup = function(params){
		var ok = confirm('Deseja realmente excluir esse grupo?');
		if(!ok){
			return;
		}
		console.log('delete>>',params);
		Group.deleteGroup(params, function(data){
			$scope.getAll();
			$location.path('/groups');
		});
	}

	/* SUBCATEGORIES */
	$scope.pushSubcategories = function(selectedSubCat, categoryLabel){

		for (var i = 0; i < $scope.subcategories.length; i++) {
			if($scope.subcategories[i].category_id == selectedSubCat.category_id){
				$scope.groupSubCats[categoryLabel].push(selectedSubCat);
				break;
			}
		};

		$scope.groupSubCats[categoryLabel] = _.uniq($scope.groupSubCats[categoryLabel]);
		$scope.selectedSubCat = "";
		console.log($scope.groupSubCats[categoryLabel]);
	}

	$scope.removeSubcategories = function(index, categoryLabel){
		
		$scope.groupSubCats[categoryLabel].splice(index,1);
	}

}
GroupCtrl.$inject = ['$rootScope', '$scope', '$routeParams', '$location', 'Group', 'Subcategory'];