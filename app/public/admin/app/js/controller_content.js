'use strict';

/* Controllers */
function ContentCtrl ($scope, $routeParams, $location, Content, Subcategory, SecurityGroups, Config){
	$scope.subcategories = [];
	$scope.contentSubCats = [];
	$scope.categorySelected = false;

	$scope.securitygroups = [];
	$scope.contentSecGroups = [];
	$scope.secgroupSelected = false;
	$scope.page = 'pt_BR';
	$scope.content = {
		descriptions : {
			en : {
				lang:'en'
			},
			pt : {
				lang:'pt'
			}
		}
	};
	Config.get(function(data){
		$scope.categories = [
			{id : data.sambavideos.categories.hardnews_id, name : 'Hard News'},
			{id : data.sambavideos.categories.archive_id, name : 'Archive'},
			{id : data.sambavideos.categories.compilations_id, name : 'Compilations'}
		]

	});


	(function init(){
		// ?media_id=8fe0fa4521e22a151f4307349e7b4dfb&cid=414&pid=1864&token=e49beab2c0d46cd6ca69d6b0395a85d4

		if('media_id' in $routeParams){

			var params = {
				sv_id : $routeParams.media_id,
				spid : $routeParams.pid,
				scid : $routeParams.cid,
				stoken : $routeParams.token
			};

			Content.get(params, function(content){
				$scope.content = content[0];

				// formata a data de exibição

				$scope.publishDateView = $scope.timeStampsToDate($scope.content.publish_date);
				if($scope.content.capture_date && $scope.content.capture_date > 0) {
					$scope.captureDateView = $scope.timeStampsToDate($scope.content.capture_date);
				}
				else
					$scope.captureDateView = "";

				/*SUBCATEGORIES*/

				Content.getSubcategories($scope.content.id, function(contentSubCats){
					if(contentSubCats[0]){
						$scope.contentSubCats = contentSubCats;
					}
					
					console.log('$scope.contentSubCats', $scope.contentSubCats);
				});




				/*SECURITY GROUPS*/

				Content.getSecurityGroup($scope.content.id, function(contentSecGroups){
					if(contentSecGroups[0]){
						console.log("OI",contentSecGroups);
						$scope.contentSecGroups = contentSecGroups;
					}
					
					console.log('$scope.contentSecGroups', $scope.contentSecGroups);
				});
				console.log($scope.content.category_id)



				/*SUBCATEGORIES LIST*/
				if($scope.content.category_id){
					Subcategory.get({category_id : $scope.content.category_id}, function(subcategories){
						$scope.subcategories = _.uniq(subcategories);

						console.log('$scope.subcategories', $scope.subcategories);
					});
					$scope.categorySelected = true;
				}



				/*SECURITY GROUP LIST*/
				SecurityGroups.get({category_id : $scope.content.category_id, type : '2,3'}, function(securitygroups){
					for(var i = 0; i<securitygroups.length; i ++){
						if (securitygroups[i].name) {
							// console.log(i, securitygroups[i].name.split(':')[0] , 'company')
							if(securitygroups[i].type == 2 || securitygroups[i].type == 3){
								$scope.securitygroups.push(securitygroups[i]);
							}
						};
					}

					console.log('$scope.securitygroups', $scope.securitygroups);
				});
				$scope.categorySelected = true;
			});
		}
	})();

	$scope.calcVideoDuration = function(secs){

		var totalSec = secs / 1000;
		var hours = parseInt( totalSec / 3600 ) % 24;
		var minutes = parseInt( totalSec / 60 ) % 60;
		var seconds = totalSec % 60;
		var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);

		return result;
	}


	/* SUBCATEGORIES */
	$scope.pushSubcategories = function(selectedSubCat){
		for (var i = 0; i < $scope.subcategories.length; i++) {
			if($scope.subcategories[i].name == selectedSubCat){
				$scope.contentSubCats.push($scope.subcategories[i]);
				break;
			}
		};

		$scope.contentSubCats = _.uniq($scope.contentSubCats);
		$scope.selectedSubCat = "";
		console.log($scope.contentSubCats);
	}
	$scope.removeSubcategories = function(index){

		console.log(index);
		$scope.contentSubCats.splice(index,1);
	}


	/* SECURITY GROUPS*/
	$scope.pushSecGroup = function(selectedSecGroup){
		console.log($scope.securitygroups);
		for (var i = 0; i < $scope.securitygroups.length; i++) {
			if($scope.securitygroups[i].name == selectedSecGroup){
				$scope.contentSecGroups.push($scope.securitygroups[i]);
				break;
			}
		};

		$scope.contentSecGroups = _.uniq($scope.contentSecGroups);
		$scope.selectedSecGroup = "";
		console.log($scope.contentSecGroups);
	}

	$scope.removeSecGroup = function(index){
		$scope.contentSecGroups.splice(index,1);
	}


	/* save */

	$scope.save = function(content){
		console.log(content);
		var params = {
			sv_id : $routeParams.media_id,
			spid : $routeParams.pid,
			scid : $routeParams.cid,
			stoken : $routeParams.token
		};
		
		Content.set(content, params, function(data){
			if(!data.error){
				console.log('Conteúdo salvo', data);	
				console.log('Salvando categorias');	
				var params = {
					content_id : data.id,
					subcategories : $scope.contentSubCats
				}
				//console.log('LAR',content.keywords)
				Content.setSubcategories(params, function(data){
					console.log('SubCategorias atualizadas com sucesso', data);

					var params = {
						content_id : content.id,
						securityGroups : $scope.contentSecGroups
					}

					Content.setSecurityGroup(params, function(data){
						console.log('Grupos de segurança atualizados com sucesso', data)
						//alert('Conteúdo salvo com sucesso!');
					});
				});
				alert('Conteúdo salvo com sucesso!');
			}else{
				console.log('Erro ao tentar atualizar arquivo')
			}

		});
	}

	$scope.changeCategory = function(category_id){
		if(category_id){
			Subcategory.get({category_id : $scope.content.category_id}, function(subcategories){
				$scope.subcategories = _.uniq(subcategories);
				$scope.contentSubCats = [];
				console.log('$scope.subcategories', $scope.subcategories);
			});
		}
	}

	$scope.timeStampsToDate = function(UNIX_timestamp){
		var a = new Date(UNIX_timestamp);
		var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date+'/'+month+'/'+year+' '+hour+':'+min+':'+sec ;
		return time;
	}


}
ContentCtrl.$inject = ['$scope', '$routeParams', '$location', 'Content', 'Subcategory', 'SecurityGroups', 'Config'];
