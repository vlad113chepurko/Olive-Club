const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    isVerified: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verificationCode: String,
    regDate: { type: Date, default: Date.now },
    hasPassedTest: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    userSchema
};
