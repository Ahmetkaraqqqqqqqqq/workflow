var controller = require("../controllers");

exports.add = function(req, res){
	var params = req.body
	console.log(params)
	controller.user.add(params, function(user){
		res.json(user);
	});
}

exports.singin = function(req, res){
	var params = req.body
	console.log(params)
	controller.user.singin(params, function(user){
		res.json(user);
	});
}

exports.account = function(req, res){
	var params = req.body
	console.log(params)
	controller.user.account(params, function(user){
		res.json(user);
	});
}
