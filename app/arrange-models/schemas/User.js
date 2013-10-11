var Sequelize = require("sequelize");

module.exports = function(sequelize) {

	var User = sequelize.define('User', { 
		
		id:             		{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
		email:     		    	{ type: Sequelize.STRING,  allowNull: false},
		name:      				{ type: Sequelize.STRING,  allowNull: false},
		password:      			{ type: Sequelize.STRING,  allowNull: false}
	});
	
	return User;
};