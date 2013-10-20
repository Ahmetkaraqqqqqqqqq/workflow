module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
    	'User', {
			id:   			{ type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},       // uid	int(11)	NO		NULL
			name:  		  { type: DataTypes.STRING(255), allowNull: true},    //name	varchar(255)	NO		NULL	
      email:      { type: DataTypes.STRING(255), allowNull: true},    //email  varchar(255)  NO    NULL  
			password:	  { type: DataTypes.STRING(255), allowNull: false},    //pawword	varchar(255)	NO		NULL	
			aboutme:    { type: DataTypes.STRING(255), allowNull: false},    //pawword  varchar(255)  NO    NULL  
      position:   { type: DataTypes.STRING(255), allowNull: false},    //pawword  varchar(255)  NO    NULL  
			created_at: { type: DataTypes.DATE   , allowNull: false}, 	  //created_at	datetime	NO		NULL	
			updated_at: { type: DataTypes.DATE   , allowNull: false}  	  //updated_at	datetime	NO		NULL	
    	}
    );
    done()
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('User');
    done()
  }
}
