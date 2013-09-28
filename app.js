
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();


app.use(express.static(path.join(__dirname, './app/public')));
var models = require('./app/arrange-models');
app.set('arrange-models', models);


var arrange = require('./app/arrange');
var admin = require('./app/admin');
app.use(arrange);
app.use(admin);

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
