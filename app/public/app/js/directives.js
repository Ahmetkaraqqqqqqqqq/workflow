'use strict';

/* Directives */

angular.module('nsApp.directives', []).
directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]);

angular.module('new_task', []).directive('new_task', function()
{
	return {
		restrict : 'E',
		templateUrl : 'partials/new_task.html',
		scope : false
	};
});
angular.module('nsApp.directives', ['new_task']);