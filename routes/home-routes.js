const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');

const homeRouter = express.Router();

homeRouter.get('/home', authMiddleware, (req,res) => {
    const {email, password, userId, uniqueId} = req.userInfo;

    res.status(200).json({
        success : true,
        message : `You are welcome to the home page :)`,
        email, 
        userId,
        uniqueId
    });
});

module.exports = homeRouter;