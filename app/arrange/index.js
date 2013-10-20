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
// app.use(express.session());
app.use(express.session({ secret: 'SECRET' }));
app.use(chromelogger.middleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

var task = require('./routes/task');
app.post('/a/tasks/new', ensureAuthenticated, task.add);
app.get('/a/tasks', ensureAuthenticated, task.all);
app.get('/a/task', task.finder);

var user = require('./routes/user');
app.post('/a/users/signup', user.add);
app.post('/a/users/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    req.session.user = user;
    return res.send({ success : true, message : 'authentication succeeded' , user : user});
  })(req, res, next);
});
app.get('/a/users/logout', function(req, res){
  console.log("efetuando logout");
  req.reset();
  req.logout();
  res.redirect("/app/#/users/singin");
});
app.get('/a/users/getUser', function(req, res, callback){
  var estaAutenticado = req.session.user != null;
  if(estaAutenticado){
    return res.send({ user : req.session.user});
  }
});

// app.all('/', function (req, res)
// {	
// 	res.redirect("/app/");
// });

//filtro de login
app.all('*', function(req,res,next){
  console.log("FILTRO DE LOGIN", req.params);
  if (req.params[0] === '/app/#/users/singin'){
    next();
  }else{
    ensureAuthenticated(req,res,next);  
  }
});

// ------------------------ PASSPORT CONFIGURATIONS --------------------------------------

passport.serializeUser(function(user, done) {
  console.log("passaport: serializando usuario - ", user);
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  console.log("passaport: desserializando usuario - id = ", id);
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
  function(email, password, done){
    var models   = app.get('arrange-models');
    models.User.find({ where: {email: email, password: password} })
        .success(function(user) {
          return done(null, user);
        })
        .error(function(user) {
          if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
          if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
          return done(null, false, { message: 'Unknown user or Invalid password.' });
        });
  }
));

function ensureAuthenticated(req, res, next) {
  var estaAutenticado = req.session.user != null;
  if (estaAutenticado) { 
    console.log("Esta autenticado =D Usuario = ", req.session.user.email);
    console.log("Direcionando para = ", req.params[0] );
    next(); 
  }
  res.redirect("/app/#/users/singin");
}