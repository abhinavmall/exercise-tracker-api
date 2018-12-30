const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Please enter username to save'
    }
});

module.exports = mongoose.model('User', userSchema);
