var passport = require('passport');
var passportLocal = require('passport-local');
var LocalStrategy = passportLocal.Strategy;

var User = require('../models/users');

var localConnection = function(app){
	passport.use('user', new LocalStrategy({
		usernameField: 'txtUserName',
		passwordField: 'txtPassword'
	},
	function(userName, password, done){
		User.findOne({userName: userName}, function(err, user){
			if(err){
				return done(err);
			}else if(!user){
				return done(null, false, {message: "Incorrect userName"});
			}else{
				if(user.password != password){
					return done(null, false, {message: "Incorrect password"});
				}else{
					return done(null, user);
				}
			}
		});
	}
	));
	app.post('/login', passport.authenticate('user', {successRedirect: '/account/home', failureRedirect: '/', failureFlash: 'Usuario o contraseña erróneos'}));
}
module.exports = localConnection;