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
app.get('/a/tasks', ensureAuthenticated,task.all);
app.get('/a/task', task.finder);

var user = require('./routes/user');
app.post('/a/users/signup', user.add);
// app.post('/a/users/login', user.login);
app.post('/a/users/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/app/#/users/singin',
                                   failureFlash: false })
);
app.get('/a/users/logout', function(req, res){
  console.log("efetuando logout");
  req.logout();
  res.redirect("/app/#/users/singin");
});

// app.all('/', function (req, res)
// {	
// 	res.redirect("/app/");
// });

app.all('*', function(req,res,next){
  console.log("direcionador geral params = ", req.params);
  console.log("teste direcionador = ", req.params[0] === '/' || req.params[0] === '/app/#/users/singin');
  if (req.params[0] === '/app/#/users/singin'){
    next();
  }else{
    ensureAuthenticated(req,res,next);  
  }
});


// ------------------------ PASSPORT CONFIGURATIONS --------------------------------------
var models   = app.get('arrange-models');
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

passport.use(new LocalStrategy(
  function(email, password, done) {
    console.log("Tentando logar...");  
  
    models.User.find({ where: {email: params.email, password: params.password} })
        .success(function(user) {
          console.log("usuario logado com sucesso = ", user);
          return done(null, user);
        })
        .error(function(user) {
          if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
          if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
          return done(null, false, { message: 'Unknown user or Invalid password.' });
        });

      // models.User.find({ where: {email: params.email, password: params.password} }, function (err, user) {
      //     if (err) { return done(err); }
      //     if (!user) {
      //       return done(null, false, { message: 'Email inválido ou inexistente.' });
      //     }
      //     if (!user.validPassword(password)) {
      //       return done(null, false, { message: 'Senha incorreta!' });
      //     }
      //     return done(null, user);
      // }); 
  }
));

function ensureAuthenticated(req, res, next) {
  console.log("ensureAuthenticated");
  if (req.isAuthenticated()) { return next(); }
  res.redirect("/app/#/users/singin");
}