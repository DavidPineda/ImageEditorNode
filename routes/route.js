var controller = require('../controllers/users');

var routes = function(app) {
    app.get('/', function(req, res){
        res.render('index');
    });
    
    app.get('/users/login', function(req, res) {
        res.render('login');
    });
        
    app.get('/users/register', function(req, res) {
        res.render('register');
    });
    
    app.get('/account/home', function(req, res) {
        res.render('home',{
            user: req.session.passport.user
        });
    });    
    
    app.post('/user', controller.addUser, function(req, res) {
        res.redirect('/users/login');
    });
}
module.exports = routes;