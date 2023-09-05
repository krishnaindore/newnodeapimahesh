const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    photo: {
        type: String
    },
    cover_photo: {
        type: String,
        default: ''
    },
    mobile: {
        type: Number,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    worksAt: {
        type: String,
        default: ''
    },
    wentTo: {
        type: String,
        default: ''
    },
    liveIn: {
        type: String,
        default: ''
    },
    from: {
        type: String,
        default: ''
    },
    dob: {
        type: Date,
        default: ''
    },
    dobNew: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    token: {
        type: String
    },

})


var userModel = mongoose.model('users', userSchema);
module.exports = userModel;