var models 	= app.get('arrange-models'),
	_ 		= require("underscore");

exports.add = function(params, callback){
	console.log('parças', params)
	models.Task.create({
		title : params.title,
		description : params.description,
		status : params.status
	}).success(function(task){
		callback(task);
	});
}

exports.all = function(callback){
	models.Task.findAll().success(function(data){
		callback(data);
	});
}

exports.finder = function(params, callback){
	console.log('OLÀAA', params)
	models.Task.findAll({where : ['status=?', params]}).success(function(data){
		callback(data);
	});
}