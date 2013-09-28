'use strict';

/* Directives */

angular.module('nsApp.directives', []).
directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]);

angular.module('sectionUser', []).directive('sectionUser', function()
{
	return {
		restrict : 'E',
		templateUrl : 'partials/profile.html',
		scope : true
	};
});

angular.module('sectionFooter', []).directive('sectionFooter', function()
{
	return {
		restrict : 'E',
		templateUrl : 'partials/footer.html',
		scope : false
	};
});

angular.module('videoModal', []).directive('videoModal', function()
{
	return {
		restrict : 'E',
		templateUrl : 'partials/videoModal.html',
		scope : false
	};
});

angular.module('advancedSearch', []).directive('advancedSearch', function()
{
	return {
		restrict : 'E',
		templateUrl : 'partials/advanced_search.html',
		scope : false
	};
});

angular.module('termsUse', []).directive('termsUse', function()
{
	return {
		restrict : 'E',
		templateUrl : 'partials/termsmodal.html',
		scope : false
	};
});

angular.module('message', []).directive('message', function()
{
	return {
		transclude: true,
		scope: {
		    title: '@',
		    text: '@',
		    button_action: '@',
		    button_lable: '&'
		},

		restrict : 'E',
		replace: true,
		templateUrl : 'partials/message.html',
	};
});



angular.module('nsApp.directives', ['sectionUser', 'sectionFooter', 'videoModal', 'advancedSearch', 'termsUse','message']);