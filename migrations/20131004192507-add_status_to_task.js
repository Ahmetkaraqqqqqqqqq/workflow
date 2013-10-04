module.exports = {
  up: function(migration, DataTypes, done) {
		migration.addColumn('Task', 'status', DataTypes.STRING);
		done()
	},
	down: function(migration, DataTypes, done) {
		migration.removeColumn('Task', 'status');
		done()
	}
}
