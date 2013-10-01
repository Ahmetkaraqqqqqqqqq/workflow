var controllers = [ "task"];

controllers.forEach(function(controller) {
	module.exports[controller] = require(__dirname + '/' + controller);
});