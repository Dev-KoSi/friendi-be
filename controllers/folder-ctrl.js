const Folder = require("../model/folder");

const saveToFolder = async (req, res) => {
    try {
        const {name, email, phone, github, linkedin, otherlink} = req.body;

        const newFile = await Folder.create({
            name,
            email, 
            phone, 
            github, 
            linkedin,
            otherlink,             
            uploadedBy : req.userInfo.userId
        });

        if(newFile) {
            return res.status(200).json({
                success : true,
                message : `Friend's file saved to Folder successfully.`,
                file : newFile
            });
        } else {
            return res.status(401).json({
                success : false,
                message : `Oops! Unable to create friend's file.`
            });
        }        

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success : false,
            message : `Failed to create file`,
            error
        })
    }
};

const getFiles = async (req, res) => {
    try {
        const {userId} = req.body;

        const getfiles = await Folder.find({uploadedBy : userId});

        if(getfiles) {
            return res.status(200).json({
                success : true,
                message : `Files retrieved successfully!`,
                getfiles : getfiles || null
            });
        } else {
            return res.status(401).json({
                success : false,
                message : `Oops! Unable to retrieve files.`
            });
        }

    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Failed to get file`,
            error
        })
    }
}

const deleteFile = async (req, res) => {
    try {
        const fileId = req.params.id;

        const delFile = await Folder.findByIdAndDelete(fileId);

        if(delFile) {
            res.status(200).json({
                success : true,
                message : `File deleted successfully.`,
                delFile
            })
        } else {
            res.status(400).json({
                success : false,
                message : `Failed to delete file, please try again.`
            })
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Failed to delete file`,
            error
        })
    }
}

module.exports = {saveToFolder, getFiles, deleteFile};