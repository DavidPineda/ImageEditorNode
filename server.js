var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');

app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function(){
	console.log('Servidor corriendo en puerto 3000');
});