const mongoose = require('mongoose');
const express = require('express');

const router = express.Router()
const authCheck = require('../middlewares/auth_check');

const Question = require('../models/question');
const User = require('../models/user');

router.get('/', authCheck, async (req, res) => {
    const questions = await Question.find({questionType: "MOTIVATION"});

    const data = questions.map(obj => {
        let rObj = {}
        rObj.questionId = obj.questionId;
        rObj.question = obj.question
        return rObj;
    });

    return res.status(200).json(data)
})

router.post('/calculate', authCheck, async (req, res) => {
    
    const questionsDataCached = await Question.find({questionType: "MOTIVATION"});
    
    const userChoices = req.body.choices;

    if (userChoices === undefined || userChoices.length < questionsDataCached)
        return res.status(400).json({
            message: "Invalid test"
        })

    const results = {
        MONEY: 0,
        SECURITY: 0,
        LEARNING: 0,
        SOCIAL: 0,
        SELF: 0
    }

    for (const id of Object.keys(userChoices)) {
        const questions = questionsDataCached.filter(e => e.questionId == id);

        if (questions.length > 0) {
            const question = questions[0];
            const toSum = userChoices[id] << 0;

            if (toSum < 0 || toSum > 5)
                return res.status(400).json({
                    message: "Invalid test"
                })

            results[question.type] += toSum;
        } else {

            return res.status(400).json({
                message: "Invalid test"
            })

        }
    }
    let soma = 0;

    Object.values(results).forEach(t => soma += t);
    
    const multiplier = (100 / soma);

    Object.keys(results).forEach(t => results[t] *= multiplier);

    await User.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.sessionData.accountId)}, {
        motivations: results
    });

    return res.status(200).json({
        results
    });
})

module.exports = router;