const Question = require('../models/question');
const Personality = require('../models/personality');
const Dailies = require('../models/dailies');

const mongoose = require('mongoose');

exports.addQuestionsToDatabase = () => {
    const parsed = require('../initializers/questions.json');
    
    parsed.questions.forEach(el => {
        const quest = new Question({
            _id: new mongoose.Types.ObjectId(),
            questionId: el.questionId,
            options: el.options,
            type: el.type,
            questionType: "DISC"
        });
        quest.save()
            .then(doc => {
                console.log(`Added new question ${doc.questionId}`);
            })
            .catch(err => {});
    })
}

exports.addPersonalityToDatabase = () => {
    const data = require('../initializers/personalities.json');

    data.personalities.forEach(el => {
        const personality = new Personality({
            _id: new mongoose.Types.ObjectId(),
            personality: el.personality,
            personalityId: el.personalityId,
            strongTraits: el.strongTraits,
            mainTraits: el.mainTraits,
            weakTraits: el.weakTraits,
            idealPositions: el.idealPositions
        })
        personality.save()
            .then(doc => {
                console.log(`Added new personality ${doc.personality}`)
            })
            .catch(err => {})
    })
}

exports.addMotivationToDatabase = () => {
    const parsed = require('./motivations.json');
    let i = 100;
    for (const category of Object.keys(parsed)) {

        for (const l of parsed[category]) {
            i++;
            const quest = new Question({
                _id: new mongoose.Types.ObjectId(),
                questionId: i,
                options: [],
                type: category,
                question: l,
                questionType: "MOTIVATION"
            })
            quest.save()
                .then(doc => {
                    console.log("Added new motivation");
                })
                .catch(err => {});
        }
    }

}

exports.addDailiesToDatabase = () => {
    const data = require('./dailies.json');
     
    for (const category of Object.keys(data)) {
        for (const daily of data[category]) {
            const d = new Dailies({
                _id: new mongoose.Types.ObjectId(),
                text: daily,
                type: category
            });
            d.save()
                .then(doc => {
                    console.log("Added new daily")
                })
                .catch(err => {});
        }
    }
}