/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')
  , chromelogger = require('chromelogger')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

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
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

var task = require('./routes/task');
app.post('/a/tasks/new', task.add);
app.get('/a/tasks', task.all);
app.get('/a/task', task.finder);

var user = require('./routes/user');
app.post('/a/users/singup', user.add);
app.post('/a/users/login', user.login);
app.get('/a/users/logout', function(req, res){
  req.logout();
  res.redirect('/a/users/singin');
});

app.all('/', function (req, res)
{	
	res.redirect("/app/");
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
	console.log('passou pelo ensureAuthenticated');
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/a/users/singin')
}