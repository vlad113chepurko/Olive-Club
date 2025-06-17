const { AnswerLog } = require('../schemes/AnswerSchema.js');

const answers = async (req, res) => {
    try {
        const logs = req.body;
        await AnswerLog.insertMany(logs);
        res.status(200).json({message: "Your answers have been saved."});
    } catch (err) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

module.exports = {
    answers,
}