var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/imageEditor');
module.exports = mongoose;