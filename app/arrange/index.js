/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')
  , chromelogger = require('chromelogger');

var app = module.exports = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('1a23sf5asdf2a1dfs2a3d4sf'));
app.use(express.session());
app.use(chromelogger.middleware);
app.use(app.router);

var task = require('./routes/task');
app.post('/a/tasks/new', task.add);
app.get('/a/tasks', task.all);
app.get('/a/tasks/status', task.finder);

app.all('/', function (req, res)
{	
	res.redirect("/app/");
});