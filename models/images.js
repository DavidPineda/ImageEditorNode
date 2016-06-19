var models = require('./models');
var Schema = models.Schema;

var schemaImage = new Schema({
    name: String,
    src: String,
    relativeSrc: String
});

var Image = models.model('Image', schemaImage, 'images');
module.exports = Image;