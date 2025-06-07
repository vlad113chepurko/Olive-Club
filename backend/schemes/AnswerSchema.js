const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    email: String,
    questionId: Number,
    answer: String,
    timestamp: { type: Date, default: Date.now },
});

const AnswerLog = mongoose.model('AnswerLog', answerSchema);

module.exports = {
    answerSchema,
    AnswerLog,
};
