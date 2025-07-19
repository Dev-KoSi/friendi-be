const User = require('../model/user');
const Folder = require('../model/folder');

const addDetails = async (req, res) => {
    const userId = req.params.id;
    const {name, email, phone, github, linkedin, otherlink} = req.body;

    try {
        const updateDetails = await User.findByIdAndUpdate(userId, {
            details : {name, email, phone, github, linkedin, otherlink}
        }, {new : true});

        res.status(200).json({
            success : true,
            message : `Details added successfully :)`,
            details : updateDetails.details
        });
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Failed to add details`,
            error
        })
    }
};

const addId = async (req, res) => {
    try {
        const userId = req.params.id;
        const {id} = req.body;

        const checkId = await User.findOne({id});

        if(checkId) {
            return res.status(401).json({
                success : false,
                message : `Sorry, this ID is already taken!!`,
                id : checkId.id
            });
        }

        const updateId = await User.findByIdAndUpdate(userId, {id : id});

        if(updateId) {
            res.status(200).json({
                success : true,
                message : `ID added successfully :)`,
                id : id
            })
        } else {
            res.status(401).json({
                success : false,
                message : `Sorry, somethng went wrong adding ID!`,
                id : checkId.id
            });
        }

    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Failed to add ID`,
            error
        })
    }
};

const retrieveDetails = async (req, res) => {
    const {id} = req.body;

    try {
        const checkId = await User.findOne({id});

        if(checkId) {
            res.status(200).json({
                success : true,
                message : `friend's details retrieved successfully!`,
                details : checkId.details
            });
        } else {
            return res.status(401).json({
                success : false,
                message : `Friend's ID is invalid!`
            })
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Failed to add ID`,
            error
        })
    }
};

module.exports = {addDetails, addId, retrieveDetails};