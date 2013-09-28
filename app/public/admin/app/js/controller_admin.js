'use strict';

/* Controllers */
function AdminCtrl ($rootScope, $scope, Config){
    $scope.loading = false;

    $rootScope.config = {};
    (function(){
    	Config.get(function(data){
    		$rootScope.config = data;
    		console.log('$rootScope.config', $rootScope.config);
    	});
    })();
}
AdminCtrl.$inject = [ '$rootScope', '$scope', 'Config'];