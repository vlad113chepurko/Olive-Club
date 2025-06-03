import mongoose from "mongoose";

export const answerSchema = new mongoose.Schema({
    email: String,
    questionId: Number,
    answer: String,
    timestamp: { type: Date, default: Date.now },
});

export const AnswerLog = mongoose.model('AnswerLog', answerSchema);