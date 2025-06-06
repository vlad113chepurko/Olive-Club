const { User } = require("../schemes/UserSchema.js");

export const adminVerifiedUser = async (req, res) => {
    try {
        const users = await User.find({ isVerified: true });

        res.status(200).json({
            message: "Список юзеров с верефикацией",
            users: users.map(user => ({
                name: user.name,
                email: user.email,
                role: user.role || 'user',
            }))
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error on server' });
    }
}