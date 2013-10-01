var models 	= app.get('arrange-models'),
	_ 		= require("underscore");

exports.add = function(task, callback){
	models.Task.create({
		title: "Paulo",
		description: "Lindo"
	}).success(function(task){
		callback(task);
	});
}