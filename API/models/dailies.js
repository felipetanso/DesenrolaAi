const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {type: String, required: true, unique: true},
    type: {type: String, required: true}
})

module.exports = mongoose.model('Dailies', questionSchema);