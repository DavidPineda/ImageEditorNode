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

    app.post('/home/editor', function(req, res){
        res.render('editor', {
            user: req.session.passport.user,
            imgSrc: req.body.mySrc
        });
    });

    app.post('/user', userCtrl.addUser, function(req, res) {
        console.log(req.params)
        res.redirect('/users/login');
    });

    app.post('/upload', imageCtrl.addImage);    
}
module.exports = routes;