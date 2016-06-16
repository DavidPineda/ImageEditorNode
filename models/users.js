var models = require('./models');
var Schema = models.Schema;

var schemaUser = new Schema({
    fullName: String,
    userName: String,
    password: String,
    profile: Schema.Types.Mixed
});

var User = models.model('User', schemaUser, 'users');
module.exports = User;