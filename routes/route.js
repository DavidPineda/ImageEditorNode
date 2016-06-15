var controller = require('../controllers/controller');

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
    
    app.get('/account/home', controller.getUsers, function(req, res) {
       res.render('home',{
           users: req.users
       });
    });
    
    app.post('/user', controller.addUser, function(req, res) {
        res.redirect('/account/home/?userName=' + req.body.txtUserName);
    });
}

module.exports = routes;