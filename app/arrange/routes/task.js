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

exports.updateStatus = function(req, res){
    console.log('req 2', req.query);
}
