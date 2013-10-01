var controller = require("../controllers");

exports.add = function(req, res){
	controller.task.add(req.body, function(task){
		res.json(task);
	});
}