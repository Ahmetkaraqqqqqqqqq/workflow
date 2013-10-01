var models 	= app.get('arrange-models'),
	_ 		= require("underscore");

exports.add = function(params, callback){
	models.Task.create({
		title: params.title,
		description: params.description
	}).success(function(task){
		callback(task);
	});
}