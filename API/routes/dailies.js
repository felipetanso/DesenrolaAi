const mongoose = require('mongoose');
const express = require('express');

const router = express.Router()
const authCheck = require('../middlewares/auth_check');

const Dailies = require('../models/dailies');
const User = require('../models/user');

router.get('/', authCheck, async (req, res) => {
    const userInfo = await User.findById(new mongoose.Types.ObjectId(req.sessionData.accountId));

    if (Date.now() - userInfo.lastCompletion < 0x5265C00) {
        return res.status(500).json({
            message: "Daily already completed today",
            left: 0x5265C00 - (Date.now() - userInfo.lastCompletion)
        })
    }

    let possibleDailies = await Dailies.find();
    possibleDailies = possibleDailies.filter(daily => !userInfo.dailies.completed.includes(daily._id));
    
    const {text, type, _id} = possibleDailies[Math.floor(Math.random() * possibleDailies.length)]

    if (possibleDailies.length > 0) {
        return res.status(200).json({
            text, type, _id
        })
    } else {
        return res.status(500).json({
            message: "All dailies completed"
        })
    }
})

router.post('/submit', authCheck, async (req, res) => {
    const {dailyId, answer} = req.body;

    const userInfo = await User.findById(new mongoose.Types.ObjectId(req.sessionData.accountId));

    if (Date.now() - userInfo.lastCompletion < 0x5265C00) {
        return res.status(500).json({
            message: "Daily already completed today",
            left: 0x5265C00 - (Date.now() - userInfo.lastCompletion)
        })
    }

    if (answer === undefined || answer.length > 450) {
        return res.status(400).json({
            message: "Answer invalid"
        })
    }

    const daily = await Dailies.findById(new mongoose.Types.ObjectId(dailyId));

    if (!daily) {
        return res.status(400).json({
            message: "Invalid daily id"
        });
    } else {
        const dailyData = {id: dailyId, answer: answer}
        await User.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.sessionData.accountId)}, {
            $push: {
                dailies: dailyData
            },
            lastCompletion: new Date()
        })
        return req.status(200).json({
            message: "Answer uploaded succesfully!"
        })
    }

})

module.exports = router;