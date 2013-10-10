var controller = require("../controllers");

exports.add = function(req, res){
	var params = req.body
	console.log(params)
	controller.user.add(params, function(user){
		res.json(user);
	});
}
