const express = require('express');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const router = express.Router();

const checkAuth = require('../middlewares/auth_check');

const mongoose = require('mongoose');

// Me
router.get('/me', checkAuth, async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.sessionData.accountId)
    const {
        name,
        friends,
        level,
        experience,
        profileType,
        wallet,
        image,
        isCompany,
        isPremium
    } = await User.findById(id);

    return res.status(200).json({
        name,
        friends,
        level,
        experience,
        profileType,
        wallet,
        image,
        isCompany,
        isPremium
    });
})

router.get('/validate', checkAuth, async (req, res) => {
    const tokenExpTime = req.sessionData.exp * 1000;
    
    if (Date.now() >= tokenExpTime) {
        res.status(401).json({
            message: "Invalid session"
        })
    } else {
        res.status(200).json({
            message: "Valid session"
        })
    }

})

// Signup
router.post('/signup', async (req, res) => {
    
    const {email, password, name, birthdate, location, identity} = req.body;

    

    if (Object.values({email, password, name, birthdate, location, identity}).includes(undefined)) 
    {
        return res.status(400).json({
            message: "User data is invalid!"
        });
        
    }
    
    const parsedBirth = moment(birthdate, "YYYY-MM-DD");

    if (!parsedBirth.isValid()) {
        return res.status(400).json({
            message: "Invalid date"
        })
    }
    
    const users = await User.find({email: email});

    if (users.length > 0) {
        return res.status(409).json({
            message: "Account already exists"
        })
    }

    bcrypt.hash(password, 5, (err, hash) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to hash password"
            });
        } else {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email,
                password: hash,
                name,
                location,
                identity,
                birthdate: parsedBirth.toDate()
            })
            newUser.save()
            .then(_ => res.status(201).json({message: "User created"}))
            .catch(error => {
                console.log(error)
                res.status(500).json({message: "Failed to create user"})
            })
        }
    })

})

// Login
router.post('/login', async (req, res) => {
    const users = await User.find({email: req.body.email});

    if (users.length > 0) {
        let user = users[0];

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({message: "Authentication failed"});
            } 

            if (result) {
                // Sign our login token
                const loginToken = jwt.sign({
                    email: user.email,
                    accountId: user._id
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "7 days"
                }
                );

                return res.status(200).json({
                    message: "Authentication succeeded",
                    token: loginToken
                })
            } else {
                return res.status(401).json({
                    message: "Authentication failed"
                })
            }

        })

    } else {
        return res.status(401).json({message: "Authentication failed"})
    }

})

// Get user info
// TODO: We might want to check for session for more sensitive data from the user
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    const userData = await User.findById(new mongoose.Types.ObjectId(userId));

    if (userData === null) {
        res.status(404).json({
            message: "User not found"
        })
    } else {
        const {
            name,
            friends,
            level,
            experience,
            image,
            isCompany,
            isPremium
        } = userData;
        return res.status(200).json({
            name,
            friends,
            level,
            experience,
            image,
            isCompany,
            isPremium
        })
    }
})

// TODO: Add description, image upload

module.exports = router