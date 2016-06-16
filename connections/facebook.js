var passport = require('passport');
var passportFacebook = require('passport-facebook');
var FacebookStrategy = passportFacebook.Strategy;

var User = require('../models/users');

var facebookConnection = function(app){
	passport.use(new FacebookStrategy({
		clientID: '',
		clientSecret: '',
		callbackURL: ''
	},
	function(token, tokenSecret, profile, done){
		User.findOne({'id': profile.id}, function(err, user){
			if(err){
				return done(err);
			}else if(!user){
				var newUser = new User({					
					userName: profile.name,
                    fullName = profile.name.givenname + ' ' + profile.name.familyName,
					profile: profile
				});
				newUser.save(function(err){
					if(err)
						throw err;
                    return done(null, newUser)
				});
			}else{
				return done(err, user);
			}
		});
    }));
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: '/account/home', failureRedirect: '/'}));      
}
module.exports = facebookConnection;