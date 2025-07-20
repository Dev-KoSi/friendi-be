const Folder = require("../model/folder");

const saveToFriends = async (req, res) => {
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
                message : `Friend is saved to Friends successfully.`,
                file : newFile
            });
        } else {
            return res.status(401).json({
                success : false,
                message : `Failed to save to Friends`
            });
        }        

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success : false,
            message : `Failed to save to Friends.`,
            error
        })
    }
};

const getFriends = async (req, res) => {
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
                message : `Oops! Unable to retrieve friends.`
            });
        }

    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Failed to get friends`,
            error
        })
    }
}

const deleteFriend = async (req, res) => {
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

module.exports = {saveToFriends, getFriends, deleteFriend};