var passport = require('passport');
var passportTwitter = require('passport-twitter');
var TwitterStrategy = passportTwitter.Strategy;

var User = require('../models/users');

var twitterConnection = function(app){
	passport.use(new TwitterStrategy({
		consumerKey: '9qbJtLes9b4dhxYiak4bHIPoy',
		consumerSecret: '8swr1s35fzBr4BM80c2Y7iBCGjT3bGlxhGSxn811Ayp0k9YVkZ',
		callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
	},
	function(token, tokenSecret, profile, done){
		User.findOne({'twitter.id': profile.id}, function(err, user){
			if(err){
				return done(err);
			}else if(!user){
				var newUser = new User({					
					userName: profile.username,
					profile: profile
				});
				var datos = JSON.stringify(eval("(" + profile._raw + ")"));
				newUser.fullName = JSON.parse(datos).name;
				newUser.save(function(err){
					if(err)
						throw err;						
					return done(null, newUser);					
				});
			}else{
				return done(err, user);
			}
		});
	}));
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect: '/account/home', failureRedirect: '/'}));
}
module.exports = twitterConnection;