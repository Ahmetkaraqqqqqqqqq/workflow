var controller = require("../controllers");

exports.add = function(req, res){
	var params = req.body
	console.log(params)
	controller.user.add(params, function(user){
		res.json(user);
	});
}

exports.login = function(req, res){
	var params = req.body
	console.log(params)
	controller.user.login(params, function(user){
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
