var passport = require('passport');
var passportGoogle = require('passport-google-oauth');
var GoogleStrategy = passportGoogle.OAuth2Strategy;

var User = require('../models/users');

var googleConnection = function(app){
	passport.use(new GoogleStrategy({
		clientID: '842390248141-8sg8ka1002p28fnuqf67amgh7l8gflbe.apps.googleusercontent.com',
		clientSecret: 'lwEg16ltLhEly0eegzAVIo_R',
		callbackURL: 'http://209.208.26.80:3000/auth/google/callback'
	},
	function(token, tokenSecret, profile, done){
		User.findOne({'google.id': profile.id}, function(err, user){
			if(err){
				return done(err);
			}else if(!user){
				var newUser = new User({					
					userName: profile.displayName,
                    fullName: profile.displayName,
					profile: profile
				});
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
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google', {successRedirect : '/account/home', failureRedirect : '/'}));
}
module.exports = googleConnection;