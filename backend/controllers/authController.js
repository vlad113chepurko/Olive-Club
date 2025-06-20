const bcrypt = require('bcrypt');
const { User } = require("../schemes/UserSchema.js");
const crypto = require("crypto");
const fs = require('fs');
const path = require('path');
const emailService  = require("../emailService.js");

const templatePath = path.join(__dirname, '..', 'templates', 'confirm_code.html');
let html = fs.readFileSync(templatePath, 'utf8');

const register = async (req, res) => {
    try {
        let { name, lastName, email, phone, password } = req.body;
        email = String(email).toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const verificationCode = crypto.randomInt(100000, 999999).toString();
        const htmlWithCode = html.replace('{{code}}', verificationCode);

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
        await emailService(email, htmlWithCode);

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
        res.status(500).json({ message: 'Registration failed. Please try again.' });
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
                message: 'Successful admin login.',
                user: {
                    email: process.env.ADMIN_LOG,
                    name: 'Admin',
                    role: 'admin',
                    isAdmin: true
                }
            });
        }

        const user = await User.findOne({ email });

        if (!user.isVerified) {
            return res.status(403).json({
                message: 'User is not verified',
                redirect: '/form/verify',
                email: user.email,
                isVerified: false
            });
        }


        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        return res.status(200).json({
            message: 'Successful login',
            user: {
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role,
                isAdmin: user.role === 'admin'
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const verify = async (req, res) => {
    try {
        let { email, code } = req.body;
        email = String(email).toLowerCase();
        code = String(code);

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.verificationCode !== code) {
            return res.status(400).json({ message: 'Verification code is incorrect.' });
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while resending code.' });
    }
}

const getVerifyUser = async (req, res) => {
    try {
        const { email } = req.query;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ isVerified: user.isVerified });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
const resendCode = async (req, res) => {
    try {
        let { email } = req.body;
        email = String(email).toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const verificationCode = crypto.randomInt(100000, 999999).toString();
        const newCode = html.replace('{{code}}', verificationCode);

        user.verificationCode = newCode;
        await user.save();

        await emailService(email, newCode);

        res.status(200).json({ message: 'Verification code was resent.' });

    } catch (error) {
        res.status(500).json({ message: 'Server error while resending code.' });
    }
}
const confirmCode = async (req, res) => {
    try {
        let { email, code } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.verificationCode !== code) {
            return res.status(400).json({ message: 'Verification code is incorrect.' });
        }

        return res.status(200).json({ message: 'Code is correct' });

    } catch (err) {
        console.error("Error in confirmCode:", err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
const setNewPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ message: 'New password must be different from the old one.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password successfully updated!" });
    } catch (err) {
        console.error("setNewPassword error:", err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
module.exports = {
    login,
    verify,
    resendCode,
    register,
    getVerifyUser,
    confirmCode,
    setNewPassword,
};