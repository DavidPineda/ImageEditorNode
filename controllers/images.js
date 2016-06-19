var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
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

exports.addImage = function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(path.dirname(require.main.filename) + '/public/uploads');
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });
    form.on('end', function() {
        for(var i = 0; i < this.openedFiles.length; i++){                
            var fileName = this.openedFiles[i].name;
            var tempPath = path.join(form.uploadDir, fileName);
            var image = new Image({
                name: fileName,
                src: tempPath,
                relativeSrc: '/uploads/' + fileName
            });
            image.save(function(err, user) {
                if(!err){
                    res.status(201);
                    next();
                }else{
                    console.log(err);
                    res.status(500).send("Ocurrio un Error");
                }
            });            
        }
        res.end('success');
    });
    form.parse(req);    
}