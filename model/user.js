const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : {
        type : String,
        require : true,
        unique : true,
    },
    email : {
        type : String,
        require : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        require :true,
        unique : true
    },
    image : {
        url : {
            type : String,
            require :true,
            unique : true
        },
        publicId : {
            type : String,
            require :true,
            unique : true
        }
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