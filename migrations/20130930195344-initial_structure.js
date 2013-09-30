module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
    	'Task', {
			id:   			{ type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},       // uid	int(11)	NO		NULL
			title:  		{ type: DataTypes.STRING(255), allowNull: true},    //name	varchar(255)	NO		NULL	
			description:	{ type: DataTypes.STRING(255), allowNull: false},    //username	varchar(255)	NO		NULL	
			
			created_at:     { type: DataTypes.DATE   , allowNull: false}, 	  //created_at	datetime	NO		NULL	
			updated_at:     { type: DataTypes.DATE   , allowNull: false}  	  //updated_at	datetime	NO		NULL	
    	}
    );
    done()
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('Task');
    done()
  }
}
