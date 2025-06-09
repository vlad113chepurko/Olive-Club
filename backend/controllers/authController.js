const bcrypt = require('bcrypt');
const { User } = require("../schemes/UserSchema.js");
const crypto = require("crypto");
const emailService  = require("../emailService.js");

const register = async (req, res) => {
    try {
        let { name, lastName, email, phone, password } = req.body;
        email = String(email).toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        const verificationCode = crypto.randomInt(100000, 999999).toString();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            lastName,
            email,
            phone,
            password: hashedPassword,
            isVerified: false,
            verificationCode,
            role: 'user'
        });

        await newUser.save();
        await emailService(email, verificationCode);

        res.status(201).json({
            message: 'User created successfully',
            user: {
                name: newUser.name,
                lastName: newUser.lastName,
                email: newUser.email,
                phone: newUser.phone,
                isAdmin: newUser.role === 'admin',
            }
        });

    } catch (error) {
        console.error("Ошибка в /registration:", error);
        res.status(500).json({ message: 'Ошибка сервера при регистрации' });
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = String(email).toLowerCase();

        const isAdminLogin = email === process.env.ADMIN_LOG;
        const isAdminPasswordMatch = await bcrypt.compare(password, process.env.ADMIN_HASH);

        if (isAdminLogin && isAdminPasswordMatch) {
            return res.status(200).json({
                message: 'Успешный вход (админ)',
                user: {
                    email: process.env.ADMIN_LOG,
                    name: 'Admin',
                    role: 'admin',
                    isAdmin: true
                }
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Пароль некорректный' });
        }

        return res.status(200).json({
            message: 'Успешный вход',
            user: {
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role,
                isAdmin: user.role === 'admin'
            }
        });

    } catch (error) {
        console.error('Ошибка при входе:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
}

const verify = async (req, res) => {
    try {
        let { email, code } = req.body;
        email = String(email).toLowerCase();
        code = String(code);

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        if (user.verificationCode !== code) {
            return res.status(400).json({ message: 'Неверный код' });
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();

        res.status(200).json({ message: 'Email подтвержден' });
    } catch (error) {
        console.error('Ошибка подтверждения:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

const resendCode = async (req, res) => {
    try {
        let { email } = req.body;
        email = String(email).toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const newCode = crypto.randomInt(100000, 999999).toString();

        user.verificationCode = newCode;
        await user.save();

        await emailService(email, newCode);

        res.status(200).json({ message: 'Код повторно отправлен на почту' });

    } catch (error) {
        console.error('Ошибка повторной отправки кода:', error);
        res.status(500).json({ message: 'Ошибка сервера при повторной отправке' });
    }
}

module.exports = {
    login,
    verify,
    resendCode,
    register
};