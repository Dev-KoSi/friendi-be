const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : String,
    email : String,
    password : String,
    image : {
        url : String,
        publicId : String
    },
    details : {
        id : String,
        name : String,
        email : String,
        phone : String,
        github : String,
        linkedin : String,
        otherlink : String
    },

}, {timestamps : true});

module.exports = mongoose.model('User', userSchema);