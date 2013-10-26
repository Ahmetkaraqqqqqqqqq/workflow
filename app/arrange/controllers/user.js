var models 	 = app.get('arrange-models')
	, _ 		   = require("underscore")
	, passport = require('passport')
  , util     = require('util')
  , LocalStrategy = require('passport-local').Strategy;
    
exports.add = function(params, callback){
  models.User.create({
    email : params.email,
    name : params.name,
    password : params.password
  }).success(function(user){
    callback(user);
  });
}

exports.updateUser = function(params, callback){
  models.User.update({
    name : params.name,
    password : params.password,
    aboutme : params.aboutme,
    position : params.position
  }).success(function(user){
    callback(user);
  });
}

exports.forgot_password = function(params, callback){
    models.User.find({ where: {email: params.email} })
        .success(function(user) {
          return done(null, true, { message: 'Email com instruções enviado para: ' + params.email });
        })
        .error(function(user) {
          if (!user) { return done(null, false, { message: 'Email inexistente.'}); }
          return done(null, false, { message: 'Erro inesperado.' });
        });
}

exports.account = function(params, callback){
  console.log('parças', params)
}