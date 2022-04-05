const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
});

var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered!'
    }
}

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', UserSchema);