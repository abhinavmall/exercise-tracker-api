const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const exerciseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'User is required to save exercise'
    },
    description: {
        type: String,
        required: 'Please enter exercise description'
    },
    duration: {
        type: Number,
        required: 'Enter duration in minutes'
    },
    date: {
        type: Date,
        default: Date.now,
        required: 'Date is required'
    }
});

module.exports = mongoose.model('Exercise', exerciseSchema);