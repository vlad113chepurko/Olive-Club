import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    userId: String,
    name: String,
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
    verificationCode: String,
});

export const User = mongoose.model('User', userSchema);