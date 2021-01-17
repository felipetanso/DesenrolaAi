const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionId: {type: Number, required: true, unique: true},
    question: {type: String, required: false},
    options: {type: [String], required: true},
    type: {type: String, require: true},
    questionType: {type: String, require: true}
})

module.exports = mongoose.model('Question', questionSchema);