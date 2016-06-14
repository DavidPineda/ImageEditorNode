var controller = require('../controllers/controller');

var routes = function(app) {
    app.get('/', function(req, res){	   
        res.render('index');
    });
    
    app.get('/users/register', function(req, res) {
        res.render('register');
    });
    
    app.get('/users', controller.getUsers, function(req, res) {
       res.render('view_user',{
           users: req.users
       });
    });
    
    app.post('/user', controller.addUser, function(req, res) {
        res.redirect('/users');
    });
}

module.exports = routes;