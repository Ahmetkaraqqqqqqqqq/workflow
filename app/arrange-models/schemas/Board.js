var Sequelize = require("sequelize");

module.exports = function(sequelize) {

	var Board = sequelize.define('Board', { 
		
		id:             		{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
		name:     		    	{ type: Sequelize.STRING,  allowNull: false},
		
	});
	
	return Board;
};