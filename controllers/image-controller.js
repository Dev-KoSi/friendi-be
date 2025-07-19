const uploadToCloudinary = require("../helper/cloudinaryHelper");
const User = require("../model/user")

const uploadImageController = async (req, res) => {
    try {        
        const userId = req.params.id;

        if(!req.file) {
            return res.status(400).json({
                success : false,
                message : `Image file not found, please insert image.`
            });
        };

        const {url, publicId} = await uploadToCloudinary(req.file.path);
        
        const newlyUploadedImage = await User.findByIdAndUpdate(userId, {image : {
            url : url,
            publicId : publicId
        }});

        if(newlyUploadedImage) {
            res.status(200).json({
                success : true,
                message : `Image uploaded successfully.`,
                image : {url, publicId}
            });
        } else {
            res.status(401).json({
                success : false,
                message : `Sorry, somethng went uploading image!`
            });
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success : false,
            message : `Something went wrong! Please try again.`
        })
    }
};

module.exports = uploadImageController;