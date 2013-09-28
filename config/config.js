var configJson = require("./config.json");

var env = process.env.NODE_ENV || "development";
var defaultConfigEnv = 'default';

// Default configs
var defaultConfig = configJson[env] || configJson[defaultConfigEnv];

// Env Variable override
var config = {};
config.db = {};
config.db.host = process.env.RDS_HOSTNAME      || process.env.DB_HOSTNAME || defaultConfig.host;
config.db.port = process.env.RDS_PORT          || process.env.DB_PORT     || defaultConfig.port;
config.db.user = process.env.RDS_USERNAME      || process.env.DB_USERNAME || defaultConfig.username;
config.db.password =  process.env.RDS_PASSWORD || process.env.DB_PASSWORD || defaultConfig.password;
config.db.dbname = process.env.RDS_DB_NAME     || process.env.DB_NAME     || defaultConfig.database;

module.exports = config;