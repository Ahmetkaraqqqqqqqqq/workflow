var Sequelize = require("sequelize");

module.exports = function(sequelize) {

	var User = sequelize.define('User', { 
		
		id:             		{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
		email:     		    	{ type: Sequelize.STRING,  allowNull: false},
		name:      				{ type: Sequelize.STRING,  allowNull: false},
		aboutme:      			{ type: Sequelize.STRING,  allowNull: true},
		position:      			{ type: Sequelize.STRING,  allowNull: true},
		password:      			{ type: Sequelize.STRING,  allowNull: false},
		//auth
	    hashed_password: 	{ type: Sequelize.STRING },
	    activationKey: 		{ type: Sequelize.STRING, sparse: true },
	    activationKeyUsed: 	{ type: Sequelize.BOOLEAN, default: false },
	    passwordResetKey: 	{ type: Sequelize.STRING },
	    passwordResetDate: 	{ type: Sequelize.DATE },
	    passwordResetUsed: 	{ type: Sequelize.BOOLEAN },
	    loginAttempts: 		{ type: Sequelize.INTEGER, required: true, default: 0 },
	    lockUntil: 			{ type: Sequelize.INTEGER },
	    accountDeactivated: { type: Sequelize.BOOLEAN, default: false }
	});
	
	return User;
};