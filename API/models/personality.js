const mongoose = require('mongoose');

const personalitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    personality: {type: String, required: true},
    personalityId: {type: String, required: true, unique: true},
    strongTraits: {type: [String], required: true},
    mainTraits: {type: [String], required: true},
    weakTraits: {type: [String], required: true},
    idealPositions: {type: [String], required: true}
})

module.exports = mongoose.model('Personality', personalitySchema);