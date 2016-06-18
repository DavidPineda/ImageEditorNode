var userCtrl = require('../controllers/users');
var imageCtrl = require('../controllers/images');
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');

var routes = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });
    
    app.get('/users/login', function(req, res) {
        res.render('login');
    });
        
    app.get('/users/register', function(req, res) {
        res.render('register');
    });
    
    app.get('/home/gallery', imageCtrl.getImages, function(req, res) {
        res.render('gallery',{
            user: req.session.passport.user,
            images: req.images
        });
    });    
    
    app.get('/home/upload', function(req, res) {
        res.render('upload', {
            user: req.session.passport.user
        });
    });

    app.post('/user', userCtrl.addUser, function(req, res) {
        res.redirect('/users/login');
    });

    app.post('/upload', function(req, res){
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = path.join(path.dirname(require.main.filename) + '/uploads');
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });
        form.on('end', function() {
            res.end('success');
        });
        form.parse(req);        
    });    
}
module.exports = routes;