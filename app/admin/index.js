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

app.all('/admin', function (req, res)
{ 
  res.redirect("/admin/app");
});