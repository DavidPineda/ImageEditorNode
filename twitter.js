var passport = require('passport');
var passportTwitter = require('passport-twitter');
var TwitterStrategy = passportTwitter.Strategy;

var User = require('./models/users');

var twitterConnection = function(app){
	passport.use(new TwitterStrategy({
		consumerKey: '',
		consumerSecret: '',
		callbackURL: ''
	},
	function(token, tokenSecret, profile, done){
		User.findOne({'twitter.id': profile.id}, function(err, user){
			if(err){
				return done(err);
			}else if(!user){
				var userNew = new User({					
					userName: profile.username,
					twitter: profile
				});
				var datos = JSON.stringify(eval("(" + profile._raw + ")"));
				userNew.fullName = JSON.parse(datos).name;
				userNew.save(function(err, user){
					if(err){
						done(err, null);
						return;
					}
				});
			}else{
				return done(err, user);
			}
		});
	}
	));
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect: '/account/home', failureRedirect: '/error', failureFlash: 'Usuario o contraseña erróneos'}));)
}
module.exports = twitterConnection;