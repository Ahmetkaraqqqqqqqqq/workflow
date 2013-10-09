'use strict';

/* Directives */

angular.module('nsApp.directives', []).directive('appVersion', ['version', function(version) {
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


angular.module('draggable', []).directive("draggable", function(){
 
    var handleDragStart = function (e){
        this.style.opacity = '1';
 
        // e.originalEvent will return the native javascript event as opposed to jQuery wrapped event
        e.originalEvent.dataTransfer.effectAllowed = 'copy';
 
        //creating an object for transferring data onto the droppable object
        var dataInfo = {
            dataId:e.currentTarget.getAttribute("data-dataId"),
            extraData:"this is a sample data"
        };
 
        //payload from the draggable object
        e.originalEvent.dataTransfer.setData('text/plain', angular.toJson(dataInfo)); // required otherwise doesn't work
 
    };
 
    var handleDragEnd = function(e){
        this.style.opacity = "1";
        e.preventDefault();
    };
 
    return {
        restrict:'A',
        link:function(scope,jElm,attrs){
            jElm.attr("draggable","true");
            jElm.bind("dragstart",handleDragStart);
            jElm.bind("dragend",handleDragEnd);
        }
    }
});

angular.module('droppable', []).directive("droppable", function(){

	return{
		restrict:'A',
		link: function(scope,jElement,attrs){
			var jElm = jElement;

			var dnD = {
				handleDropleave : function(e){
					jElm.removeClass("over"); // for removing highlighting effect on droppable object
				},

				handleDragEnter : function(e) {
					if (e.preventDefault) e.preventDefault(); // allows us to drop
					jElm.addClass("over"); // for giving highlighting effect on droppable object
				},

				handleDragOver : function(e) {
					if (e.preventDefault) e.preventDefault(); // allows us to drop
					jElm.addClass("over"); // for giving highlighting effect on droppable object
					return false;
			  	},

		  		handleDropped : function(e){
					if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting..

					var jsonDataStr = e.originalEvent.dataTransfer.getData('text/plain');

					//console.log("recieved ", jsonData);
					if(jsonDataStr){
						var jsonData = angular.fromJson(jsonDataStr);

						scope.fnOnDrop(jsonData); // this will be called on the directive's parent scope
					}
					jElm.removeClass("over"); // for removing highlighting effect on droppable object

					return false;
				}
			};
			jElement.bind("dragenter",dnD.handleDragEnter);
			jElement.bind("dragover",dnD.handleDragOver);
			jElement.bind("dragleave",dnD.handleDropleave);
			jElement.bind("drop",dnD.handleDropped);

		},
	}
});

angular.module('nsApp.directives', ['new_task', 'droppable', 'draggable']);