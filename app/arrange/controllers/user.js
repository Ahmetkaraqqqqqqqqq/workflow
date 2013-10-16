var models 	 = app.get('arrange-models')
	, _ 		   = require("underscore")
	, passport = require('passport')
  , util     = require('util')
  , LocalStrategy = require('passport-local').Strategy;
    
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(email, password, done) {
    console.log("Tentando logar...");  
  
    models.User.find({ where: {email: params.email, password: params.password} })
        .success(function(user) {
          return callback(user);
        })
        .error(function(user) {
          if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
          if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
          callback(user);
        });
  }
));

exports.login = function(params, callback){
  console.log("I'm here - login on users.js", params);
  // passport.authenticate('local', { failureRedirect: '/a/users/singin' },
  //   function(req, res) {
  //     console.log("entrou no metodo de logar");
  //     res.redirect('/');
  //   });
  console.log("passou do metodo de logar");
  models.User.find({ where: ["email = '"+params.email+"' AND password = '"+params.password+"'"]})
      .success(function(user) {
          console.log('pesquisa login feita!');
          callback(user);
      })
      .error(function(user) {
        console.log('erro ao logar');
        callback('error' : 'erro ao logar');
      });
}

exports.add = function(params, callback){
  console.log('opa chegou no controller do node =D', params)
  models.User.create({
    email : params.email,
    name : params.name,
    password : params.password
  }).success(function(user){
    callback(user);
  });
}

exports.account = function(params, callback){
  console.log('parças', params)
}

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/a/users/singin')
}