const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, "upload/")
    },
    filename : function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new Error(`An error occured, please upload only images.`))
    }
}

const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    limits : {
        fileSize : 5 * 1024 * 1024 //5M
    }
});

module.exports = upload.single("image");