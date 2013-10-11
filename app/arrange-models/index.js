var Sequelize = require("sequelize")
, appConfig = app.get("appConfig");

var sequelize = new Sequelize(appConfig.db.dbname, appConfig.db.user, appConfig.db.password, {
	host: appConfig.db.host,
	port: appConfig.db.port,
	
	logging: true,
	
	define: {
		underscored: true,
		freezeTableName: true,
		syncOnAssociation: true,
		charset: 'utf8',
		timestamps: true
	}, 
});

var models = [ 
	
	"Note", "Task" , "User"

];

models.forEach(function(model) {
	module.exports[model] = require(__dirname + '/schemas/' + model)(sequelize);
});


module.exports['Sequelize'] = sequelize;