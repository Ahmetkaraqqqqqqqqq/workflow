module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
    	'User', {
			id:   			{ type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},       // uid	int(11)	NO		NULL
			name:  		  { type: DataTypes.STRING(255), allowNull: true},    //name	varchar(255)	NO		NULL	
      email:      { type: DataTypes.STRING(255), allowNull: true},    //email  varchar(255)  NO    NULL  
			password:	  { type: DataTypes.STRING(255), allowNull: false},    //pawword	varchar(255)	NO		NULL	
			aboutme:    { type: DataTypes.STRING(255), allowNull: true},    //pawword  varchar(255)  NO    NULL  
      position:   { type: DataTypes.STRING(255), allowNull: true},    //pawword  varchar(255)  NO    NULL  
			created_at: { type: DataTypes.DATE   , allowNull: false}, 	  //created_at	datetime	NO		NULL	
			updated_at: { type: DataTypes.DATE   , allowNull: false},  	  //updated_at	datetime	NO		NULL	
      
      // auth
      hashed_password:    { type: DataTypes.STRING(255),  allowNull: true},
      activationKey:      { type: DataTypes.STRING(255),  allowNull: true},
      activationKeyUsed:  { type: DataTypes.BOOLEAN,      allowNull: true},
      passwordResetKey:   { type: DataTypes.STRING(255),  allowNull: true},
      passwordResetDate:  { type: DataTypes.DATE,         allowNull: true},
      passwordResetUsed:  { type: DataTypes.BOOLEAN,      allowNull: true},
      loginAttempts:      { type: DataTypes.INTEGER,      allowNull: true},
      lockUntil:          { type: DataTypes.INTEGER,      allowNull: true},
      accountDeactivated: { type: DataTypes.BOOLEAN,      allowNull: true}
    	}
    );
    done()
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('User');
    done()
  }
}
