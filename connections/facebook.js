var passport = require('passport');
var passportFacebook = require('passport-facebook');
var FacebookStrategy = passportFacebook.Strategy;

var User = require('../models/users');

var facebookConnection = function(app){
	passport.use(new FacebookStrategy({
		clientID: '903546249767743',
		clientSecret: 'fd267adc43739bc1208ac347ff63b94f',
		callbackURL: 'http://209.208.26.80:3000/auth/facebook/callback'
	},
	function(token, tokenSecret, profile, done){
		User.findOne({'id': profile.id}, function(err, user){
			if(err){
				return done(err);
			}else if(!user){
				var newUser = new User({					
					userName: profile.name,
                    fullName: profile.name.givenname + ' ' + profile.name.familyName,
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
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: '/home/gallery', failureRedirect: '/'}));      
}
module.exports = facebookConnection;