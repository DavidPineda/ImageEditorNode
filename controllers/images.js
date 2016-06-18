var _ = require('lodash');
var Image = require('../models/images');

exports.getImages = function(req, res, next) {
    Image.find(function(err, images) {
       if(!err){
           req.images = images;
           next();
       }else{
           console.log(err);
       }
    });
}