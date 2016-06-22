var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
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

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('print', function(point){
		console.log(point);
		socket.broadcast.emit('print', point);
	});
});

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

var local = require('./connections/local');
local(app);

var twitter = require('./connections/twitter');
twitter(app);

var facebook = require('./connections/facebook');
facebook(app);

var port = Number(process.env.PORT || 3000);

server.listen(port, function(){
	console.log('Servidor corriendo en puerto ' + port);
});