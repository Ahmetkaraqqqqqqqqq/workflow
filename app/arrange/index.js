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

//dynamic helpers
  // app.use(function(req, res, next) {
  //   // var formData = req.session.formData || {}
  //   // delete req.session.formData;

  //   res.locals({
  //     //for use in templates
  //       appName: config.appName
  //     // needed for csrf support
  //     , token: req.session._csrf
  //     // //for changing templates depending on whether the user is logged in
  //     , get user() {
  //       return req.user;
  //     }
  //     , isAuthenticated: req.isAuthenticated
  //     // , publicDir: __dirname
  //   });
  //   next();
  // });

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
    return done(null, false, user);
    
    // models.User.find({ where: {email: params.email, password: params.password} })
    //     .success(function(user) {
    //       console.log("usuario logado com sucesso = ", user);
    //       return done(null, false, user);
    //     })
    //     .error(function(user) {
    //       if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    //       if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
    //       return done(null, false, { message: 'Unknown user or Invalid password.' });
    //     });
  }
));

var task = require('./routes/task');
app.post('/a/tasks/new', ensureAuthenticated, task.add);
app.get('/a/tasks', ensureAuthenticated,task.all);
app.get('/a/task', task.finder);

var user = require('./routes/user');
app.post('/a/users/signup', user.add);
// app.post('/a/users/login', user.login);
// app.post('/a/users/login',
//   passport.authenticate('local', { session: false }), 
//   function(req, res) {
//     console.log("Usuario = ", req.user);
//     res.json(req.user);
//   });

app.post('/a/users/login', ensureAuthenticated, function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("tentando autenticar Err", err);
    console.log("tentando autenticar User", user);
    console.log("tentando autenticar Info", info);
    var error = err || info;
    if (error) {
      if (typeof(error.message) !== 'undefined') {
        var text = error.message;
        error = text;
      }
      // req.session.error = error;
      // return res.redirect('/login');
      return res.json(406, { error: error });
    }
    req.newUser = user;
    next();
    })});

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
  if (req.params[0] === '/app/#/users/singin'){
    next();
  }else{
    ensureAuthenticated(req,res,next);  
  }
});


// ------------------------ PASSPORT CONFIGURATIONS --------------------------------------

function ensureAuthenticated(req, res, next) {
  var estaAutenticado = req.isAuthenticated();
  console.log("req.user = ", req.user);
  console.log("ensureAuthenticated = ", estaAutenticado);
  if (estaAutenticado) { return next(); }
  res.redirect("/app/#/users/singin");
}