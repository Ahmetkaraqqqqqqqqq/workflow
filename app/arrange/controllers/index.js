var controllers = [ "task", "user"];

controllers.forEach(function(controller) {
	module.exports[controller] = require(__dirname + '/' + controller);
});