var _ = require('lodash');
var User = require('../models/users');

exports.getUser = function(req, res, next) {
    User.find({userName: req.query.userName}, function(err, user) {
        if(!err){
            req.user = user;
            next();
        }else{
            console.log(err);
            res.status(500).send("Ocurrio un Error");
        }
    });
}

exports.addUser = function(req, res, next) {
    var user = new User({
        fullName: req.body.txtFullName,
        userName: req.body.txtUserName,
        password: req.body.txtPassword
    });
    user.save(function(err, user) {
        if(!err){
            res.status(201);
            next();
        }else{
            console.log(err);
            res.status(500).send("Ocurrio un Error");
        }
    })
}