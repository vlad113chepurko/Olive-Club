const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: String,
    name: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verificationCode: String,
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    userSchema
};
