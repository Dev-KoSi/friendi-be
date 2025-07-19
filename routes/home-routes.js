const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');

const homeRouter = express.Router();

homeRouter.get('/home', authMiddleware, (req,res) => {
    const {email, password, userId} = req.userInfo;

    res.status(200).json({
        success : true,
        message : `You are welcome to the home page :)`,
        email, 
        userId
    });
});

module.exports = homeRouter;