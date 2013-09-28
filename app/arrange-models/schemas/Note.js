var Sequelize = require("sequelize");

module.exports = function(sequelize) {

	var Note = sequelize.define('Note', { 
		
		id:             		{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
		title:     		    	{ type: Sequelize.STRING,  allowNull: false},
		description:      			{ type: Sequelize.STRING,  allowNull: false}
	});
	
	return Note;
};