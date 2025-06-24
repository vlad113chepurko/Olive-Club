const { AnswerLog } = require('../schemes/AnswerSchema.js');
const { User } = require('../schemes/UserSchema.js');
const answers = async (req, res) => {
    try {
        const answers = req.body;

        if (!Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({ message: "No answers provided" });
        }

        const email = answers[0].user;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.hasPassedTest = true;
        await user.save();

        const logs = answers.map(ans => ({
            email: ans.user,
            questionIndex: ans.questionIndex,
            answer: ans.answer,
            createdAt: ans.createdAt
        }));

        await AnswerLog.insertMany(logs);

        res.status(200).json({ message: "Your answers have been saved." });
    } catch (err) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = {
    answers,
}