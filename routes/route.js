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
    
    app.get('/account/home', controller.getUser, function(req, res) {
       res.render('home',{
           user: req.user
       });
    });
    
    app.post('/user', controller.addUser, function(req, res) {
        res.redirect('/account/home/?userName=' + req.body.txtUserName);
    });
}

module.exports = routes;