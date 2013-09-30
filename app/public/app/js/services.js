'use strict';

/* Services */
var module = angular.module('nsApp.services', []).
value('version', '0.1').
value('name', 'Arrange');


angular.module('nsApp.services.task', []).factory('Task', ['$http', function ($http)
{
	var Task = {};
	return Task;
}]);