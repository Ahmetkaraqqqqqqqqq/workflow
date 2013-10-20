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

exports.account = function(params, callback){
  console.log('parças', params)
}