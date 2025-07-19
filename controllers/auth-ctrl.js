const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');


const signup = async (req, res) => {
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }

    try {
        const {email, password} = req.body;

        if(!validator.isEmail(email)) {
            return res.status(400).json({
                success : false,
                message : `Invalid email, try again!`
            })
        }

        const checkExistingUser = await User.findOne({email});

        if(checkExistingUser) {
            return res.status(400).json({
                success : false,
                message : `User is already registered !!`
            });
        }

        if(!isValidPassword(password)) {
            return res.status(400).json({
                success : false,
                message : `Weak password! Add at least an uppercase, a number and 8 characters long.`
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password, salt);

        const newlyCreatedUser = await User.create({
            email,
            password : hashPassword
        });

        if(newlyCreatedUser) {
            res.status(200).json({
                success : true,
                message : `Account created successfully, please log in.`,
                user : newlyCreatedUser
            });
        } else {
            res.status(400).json({
                success : false,
                message : `Unable to register user!!, please try again.`
            });
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Something went wrong, please try again.`,
            error : error
        })
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const checkUser = await User.findOne({email});

        if(!checkUser) {
            return res.status(400).json({
                success : false,
                message : `User does not exist! Please sign up.`
            });
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);

        if(!checkPassword) {
            return res.status(400).json({
                success : false,
                message : `Wrong password!! `
            });
        }

        const accessToken = await jwt.sign({
            userId : checkUser._id,
            email : checkUser.email,
            password : checkUser.password
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : `24h`
        });

        res.status(200).json({
            success : true,
            message : `Log in successful!! You are welcome :)`,
            email : checkUser.email,
            accessToken,
            userId : checkUser._id,
            id : checkUser.id === undefined ? '' : checkUser.id,
            details : checkUser.details,
            image : checkUser.image
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Something went wrong, try again :(`,
            error : error
        })
    }
}

module.exports = {signup, login};