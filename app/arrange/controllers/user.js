var models 	= app.get('arrange-models'),
	_ 		= require("underscore");

exports.add = function(params, callback){
	console.log('parças', params)
	models.User.create({
		email : params.email,
		username : params.username,
		password : params.password
	}).success(function(user){
		callback(user);
	});
}