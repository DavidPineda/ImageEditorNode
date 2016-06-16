var express = require('express');
var app = express();
var server = require('http').createServer(app);

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var swig = require('swig');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({cache: false});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	store: new RedisStore({}),
	secret: 'nextapp'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done){
	console.log('Serialize: ' + user);
	done(null, user);
});

passport.deserializeUser(function(obj, done){
	console.log('Deserialize: ' + obj);
	done(null, obj);
});

swig.setFilter('uniqObject', function(input, f) {
	return _.uniq(input, f);
})

var routes = require('./routes/route');
routes(app);

var local = require('./local');
local(app);

var twitter = require('./twitter');
twitter(app);

var port = Number(process.env.PORT || 3000);

server.listen(port, function(){
	console.log('Servidor corriendo en puerto ' + port);
});