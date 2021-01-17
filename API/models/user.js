const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    // Basic user data
    email: 
    { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    password: { type: String, required: true },
    name: {type: String, required: true},
    birthdate: {type: Date, required: true},
    location: {
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
    },
    identity: {type: String, required: true},
    phone: {type: String, required: false, default: ""},
    image: {type: String, required: false, default: ""},
    isCompany: {type: Boolean, required: true, default: false},
    isPremium: {type: Boolean, required: false, default: false},

    // Dailies
    dailies: [{id: mongoose.Schema.Types.ObjectId, answer: String}],
    lastCompletion: {type: Date, required: false, default: new Date(0)},

    // Social
    friends: {type: [mongoose.Schema.Types.ObjectId], required: false},
    description: {type: String, required: false, default: ""},

    motivations: {
        MONEY: {type: Number, required: false, default: 0},
        SECURITY: {type: Number, required: false, default: 0},
        LEARNING: {type: Number, required: false, default: 0},
        SOCIAL: {type: Number, required: false, default: 0},
        SELF: {type: Number, required: false, default: 0}
    },

    // Gamification
    level: {type: Number, required: false, default: 0},
    experience: {type: Number, required: false, default: 0},

    personality: {
        DOMINANT: {type: Number, required: false, default: 0},
        INFLUENT: {type: Number, required: false, default: 0},
        STABILITY: {type: Number, required: false, default: 0},
        CAUTIOUS: {type: Number, required: false, default: 0},
    },
    wallet: {type: Number, required: false, default: 0}
})

module.exports = mongoose.model('User', userSchema);