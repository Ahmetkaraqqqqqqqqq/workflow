var models 	 = app.get('arrange-models')
	, _ 		   = require("underscore")
	, passport = require('passport')
  , util     = require('util')
  , LocalStrategy = require('passport-local').Strategy;
    
// passport.serializeUser(function(user, done) {
//   console.log("passaport: serializando usuario - ", user);
//   done(null, user);
// });

// passport.deserializeUser(function(id, done) {
//   console.log("passaport: desserializando usuario - id = ", id);
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// passport.use(new LocalStrategy(
//   function(email, password, done) {
//     console.log("Tentando logar...");  
  // 
    // models.User.find({ where: {email: params.email, password: params.password} })
    //     .success(function(user) {
    //       return callback(user);
    //     })
    //     .error(function(user) {
    //       if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    //       if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
    //       callback(user);
    //     });
// 
//       models.User.find({ where: {email: params.email, password: params.password} }, function (err, user) {
//           if (err) { return done(err); }
//           if (!user) {
//             return done(null, false, { message: 'Email inválido ou inexistente.' });
//           }
//           if (!user.validPassword(password)) {
//             return done(null, false, { message: 'Senha incorreta!' });
//           }
//           return done(null, user);
//       }); 
//   }
// ));

// exports.login = function(params, callback){
  // console.log("I'm here - login on users.js", params);
  // passport.authenticate('local', { successRedirect: '/',
  //                                  failureRedirect: '/#/users/singin',
  //                                  failureFlash: true });
          
  
  // passport.authenticate('local', { failureRedirect: '/#/users/singin' },
  //   function(req, res) {
  //     console.log("entrou no metodo de logar");
  //     res.redirect('/');
  //   });

  // console.log("passou do metodo de logar");
  // models.User.find({ where: ["email = '"+params.email+"' AND password = '"+params.password+"'"]})
  //     .success(function(user) {
  //         console.log('pesquisa login feita!');
  //         callback(user);
  //     })
  //     .error(function(user) {
  //       console.log('erro ao logar');
  //       callback({'error:':'Usuario inexistente!'});
  //     });
// }

exports.add = function(params, callback){
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