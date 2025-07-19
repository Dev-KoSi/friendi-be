const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    github: String,
    linkedin: String,
    otherlink: String,
    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    }
}, {timestamps : true});

module.exports = mongoose.model('Folder', folderSchema);