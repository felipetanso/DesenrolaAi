const mongoose = require('mongoose');
const express = require('express');

const router = express.Router()
const authCheck = require('../middlewares/auth_check');

const Question = require('../models/question');
const Personality = require('../models/personality');
const User = require('../models/user');

router.get('/', authCheck, async (req, res) => {
    const questions = await Question.find({questionType: "DISC"});

    const data = questions.map(obj => {
        let rObj = {}
        rObj.questionId = obj.questionId;
        rObj.options = obj.options;
        return rObj;
    });

    return res.status(200).json(data)
})

router.post('/calculate', authCheck, async (req, res) => {
    
    console.log(req.body)

    const questionsDataCached = await Question.find({questionType: "DISC"});
    
    const userChoices = req.body.choices;

    if (userChoices === undefined || userChoices.length < questionsDataCached)
        return res.status(400).json({
            message: "Invalid test"
        })

    const sums = {
        DOMINANT: 0,
        INFLUENT: 0,
        STABILITY: 0,
        CAUTIOUS: 0
    }

    const multiplier = (100 / 40);

    for (const id of Object.keys(userChoices)) {
        const questions = questionsDataCached.filter(e => e.questionId == id);

        if (questions.length > 0) {
            const question = questions[0];
            const toSum = userChoices[id];

            if (toSum < 0 || toSum > 4)
                return res.status(400).json({
                    message: "Invalid test"
                })

            sums[question.type] += toSum;
        } else {

            return res.status(400).json({
                message: "Invalid test"
            })

        }
    }

    const sorted = Object.keys(sums).sort((a, b) => sums[a] > sums[b] ? -1 : 1)
    
    Object.keys(sums).forEach(t => sums[t] *= multiplier);

    const personalityResult = await Personality.findOne({personalityId: sorted[0]});

    const {
        personality,
        personalityId,
        strongTraits,
        mainTraits,
        weakTraits,
        idealPositions
    } = personalityResult;

    await User.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req.sessionData.accountId)
    }, {personality: sums})

    return res.status(200).json({
        sums, 
        result: {
            personality,
            personalityId,
            strongTraits,
            mainTraits,
            weakTraits,
            idealPositions
        }
    });
})

module.exports = router;