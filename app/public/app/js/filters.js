
/* Filters */

angular.module('nsApp.filters', []).
filter('interpolate', ['version', function(version) {
	return function(text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	}
}]);


angular.module('nsApp.filters', []).filter('startFrom', function() {
	return function(input, start) {
		start = +start; //parse to int

		return input.slice(start);
	}
});