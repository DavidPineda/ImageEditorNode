var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var _ = require('lodash');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/register', function(req, res) {
	res.sendFile(__dirname + '/views/register.html');
});

server.listen(3000, function(){
	console.log('Servidor corriendo en puerto 3000');
});