var controller = require("../controllers");

exports.add = function(req, res){
	var params = req.body
	console.log(params)
	controller.task.add(params, function(task){
		res.json(task);
	});
}

exports.all = function(req, res){
	controller.task.all(function(task){
		res.json(task);
	});
}
