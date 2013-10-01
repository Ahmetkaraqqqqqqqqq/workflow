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

exports.all = function(callback){
	models.Task.findAll().success(function(data){
		callback(data);
	});
}