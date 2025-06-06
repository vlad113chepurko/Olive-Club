const { AnswerLog } = require('../schemes/AnswerSchema.js');

export const answers = async (req, res) => {
    try {
        const logs = req.body;
        await AnswerLog.insertMany(logs);
        res.status(200).json({message: "Answers saved"});
    } catch (err) {
        res.status(500).json({ message: 'Error on server' });
    }
}