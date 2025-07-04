const { User } = require("../schemes/UserSchema.js");
const PDFDocument = require("pdfkit");
const {AnswerLog} = require("../schemes/AnswerSchema");

const adminGetUsers = async (req, res) => {
    try {
        const sortOrder = req.query.sort === 'new' ? -1 : 1;
        const users = await User.find().sort({ regDate: sortOrder });

        res.status(200).json({
            message: "Список юзеров",
            users: users.map(user => ({
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                regDate: user.regDate,
            }))
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error on server' });
    }
}

const adminRemoveUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: `User with email: ${email} was removed!`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const adminDownload = async (req, res) => {
    try {
        const users = await User.find({}, 'name lastName email phone');
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');

        doc.pipe(res);


        doc.fontSize(13).text('List of users', { align: 'center' });
        doc.moveDown();

        users.forEach((user, i) => {
            doc.fontSize(12).text(`${i + 1}. ${user.name} — ${user.lastName} — ${user.email} - ${user.phone}`);
        });

        console.debug("User data: ", users);
        doc.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error generating PDF.' });
    }
}

const adminCheckSurvey = async (req, res) => {
    try {
        const { decodedEmail } = req.body;

        if (!decodedEmail) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email: decodedEmail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const answers = await AnswerLog.find({ email: decodedEmail });

        const fullSurvey = answers.map(ans => ({
            id: ans._id,
            answer: ans.answer,
        }));

        res.status(200).json({
            userName: `${user.name} ${user.lastName}`,
            questions: fullSurvey,
        });
    } catch (err) {
        console.error("Ошибка в adminCheckSurvey:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
module.exports = {
    adminGetUsers,
    adminRemoveUser,
    adminDownload,
    adminCheckSurvey,
}