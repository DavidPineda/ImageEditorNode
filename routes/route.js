var userCtrl = require('../controllers/users');
var imageCtrl = require('../controllers/images');

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

    app.post('/upload', imageCtrl.addImage);    
}
module.exports = routes;