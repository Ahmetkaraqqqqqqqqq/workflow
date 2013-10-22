var controller = require("../controllers");

exports.add = function(req, res){
	var params = req.body
	console.log(params);
	controller.task.add(params, function(task){
		res.json(task);
	});
}

exports.all = function(req, res){
	controller.task.all(function(task){
		res.json(task);
	});
}

exports.finder = function(req, res){
	console.log('req', req.query);
	var status = req.query.status;
	controller.task.finder(status, function(task){
		res.json(task);
	});
}

exports.findById = function(req, res){
	var id = req.query.id;
	controller.task.findById(id, function(task){
		res.json(task);
	});
}

exports.update = function(req, res){
	console.log("passando")
	controller.task.update(req.params, function(task){
		res.json(task);
	});
}
