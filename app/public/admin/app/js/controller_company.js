'use strict';

/* Controllers */
function CompanyCtrl ($rootScope, $scope, $location, $routeParams, Company, Subcategory){
	$scope.groups = {};
	$scope.companies = {};
	$scope.form = {};
	// 
	$scope.subcategories = [];
	$scope.hardnews_cat = [];
	$scope.archive_cat = [];
	$scope.compilations_cat = [];
	$scope.companySubCats = {hardnews : [], archive:[], compilations:[]};

	// 

	(function init(){
		$scope.company = {company_group_id : 3}; // Seta empresas sem grupo como  No Group;
		
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


	$scope.primaryActivities = [
		'TV Channel',
		'Consultant',
		'Production Company',
		'Telecom operator',
		'Sport Agency',
		'SNG Supplier',
		'News agency',
		'Other'
	]

	$scope.getAll = function(){
		Company.get(function(companies){
			if(companies){
				console.log('companies>', companies);
				$scope.companies = companies;
			}
		});
	}


	$scope.getCompany = function(){
		var id = $routeParams.id;
		console.log($routeParams)
		$scope.form = {};

		Company.getCompany(id, function(company){
			$scope.company = company[0];
			console.log('company>', $scope.company);

			Company.getSubcategories($scope.company.id, function(companysubcats){

				for(var i = 0; i < companysubcats.length; i++){

					if(companysubcats[i].category_id == $rootScope.config.sambavideos.categories.hardnews_id){
						$scope.companySubCats['hardnews'].push(companysubcats[i]);
					}
					if(companysubcats[i].category_id == $rootScope.config.sambavideos.categories.archive_id){
						$scope.companySubCats['archive'].push(companysubcats[i]);
					}
					if(companysubcats[i].category_id == $rootScope.config.sambavideos.categories.compilations_id){
						$scope.companySubCats['compilations'].push(companysubcats[i]);
					}
				}

				
			});
		});
	}

	$scope.addCompany = function(params){
		console.log("I'm here", $scope.form);
		Company.add($scope.form, function(company){
			var catsTosend = [];
			catsTosend.push($scope.companySubCats.hardnews);
			catsTosend.push($scope.companySubCats.archive);
			catsTosend.push($scope.companySubCats.compilations);

			catsTosend = _.flatten(catsTosend); // transforma array, multíníveis em um único nível | _.flatten([1, [2], [3, [[4]]]]); => [1, 2, 3, 4];
			var params = {
				company_id : company.id,
				subcategories : catsTosend
			}

			Company.setSubcategories(params, function(data){
				console.log('setsubcategories', data);

				alert('Empresa salva com sucesso!');
		  		//$scope.getAll();
		  		$location.path('/companies');
			});
		});
	}

	$scope.set = function(params){
		
		Company.set(params, function(data){

			var catsTosend = [];
			catsTosend.push($scope.companySubCats.hardnews);
			catsTosend.push($scope.companySubCats.archive);
			catsTosend.push($scope.companySubCats.compilations);

			catsTosend = _.flatten(catsTosend); // transforma array, multíníveis em um único nível | _.flatten([1, [2], [3, [[4]]]]); => [1, 2, 3, 4];
			var params = {
				company_id : $scope.company.id,
				subcategories : catsTosend
			}

			Company.setSubcategories(params, function(data){
				console.log('setsubcategories', data);

				alert('Empresa salva com sucesso!');
		  		//$scope.getAll();
		  		$location.path('/companies');
			});
		});
	}

	$scope.deleteCompany = function(params){
		var ok = confirm('Deseja realmente excluir essa empresa?');
		if(!ok){
			return;
		}
		console.log('delete>>',params);
		Company.delete(params, function(data){
			$scope.getAll();
			$location.path('/companies');
		});
	}

	/* SUBCATEGORIES */
	$scope.pushSubcategories = function(selectedSubCat, categoryLabel){

		for (var i = 0; i < $scope.subcategories.length; i++) {
			if($scope.subcategories[i].category_id == selectedSubCat.category_id){
				$scope.companySubCats[categoryLabel].push(selectedSubCat);
				break;
			}
		};

		$scope.companySubCats[categoryLabel] = _.uniq($scope.companySubCats[categoryLabel]);
		$scope.selectedSubCat = "";
		console.log($scope.companySubCats[categoryLabel]);
	}

	$scope.removeSubcategories = function(index, categoryLabel){
		
		$scope.companySubCats[categoryLabel].splice(index,1);
	}

	$scope.getGroups = function(){
		Company.getGroups(function(groups){
			if (groups) {
				console.log(groups);
				$scope.groups = groups;
			};
		});	
	}

}

CompanyCtrl.$inject = ['$rootScope','$scope', '$location', '$routeParams', 'Company', 'Subcategory'];
