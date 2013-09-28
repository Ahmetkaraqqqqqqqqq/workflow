'use strict';

/* Controllers */
function RequestContentCtrl ($scope, $routeParams, $location, RequestContent){
  $scope.request_contents = {};
  $scope.request_content = {};
  
  $scope.get = function(){
		var id = $routeParams.id;
		
		var params = {}

		if('id' in $routeParams){
			params = {
				id : $routeParams.id
			}
		}
    
    console.log('passei')
		
		RequestContent.get(params, function(request_content){
			if('id' in $routeParams){
				$scope.request_content = request_content;
			}else{
				$scope.request_contents = request_content;
			}
			console.log('request_content>', $scope.request_contents);
		});
		
	}
}
RequestContentCtrl.$inject = ['$scope', '$routeParams', '$location', 'RequestContent'];