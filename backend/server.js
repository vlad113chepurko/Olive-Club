    import express from 'express';
    import dotenv from 'dotenv';
    import mongoose from 'mongoose';
    import nodemailer from 'nodemailer';
    import bcrypt from 'bcrypt';
    import cors from 'cors';

    // Schemes
    import {User} from "./schemes/UserSchema.js";
    import {AnswerLog} from "./schemes/AnswerSchema.js";

    import {emailService} from "./emailService.js";
    import * as crypto from "node:crypto";

    dotenv.config();

    const PORT = 3000;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    const app = express();
    app.use(cors());
    app.use(express.json());

    console.log("MONGO_URI из .env:", process.env.DB_CONNECTION);


    mongoose.connect(process.env.DB_CONNECTION, {
    }).then(() => {
        console.log('MongoDB connected');
    }).catch(err => {
        console.log('Error connecting to MongoDB', err.message);
        process.exit(1);
    })

    app.post('/registration', async (req, res) => {
        try {
            const { name, lastName, email, password } = req.body;

            const existingUser = await User.findOne({ email: String(email).toLowerCase() });

            if(existingUser) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
            } else {

                const verificationCode = crypto.randomInt(100000, 999999).toString();

                const newUser = new User(
                  {
                      name,
                      lastName,
                      email,
                      password,
                      isVerified: false,
                      verificationCode,
                  }
                );
                await newUser.save();
                await emailService(email, verificationCode);
                res.status(201).json({message: 'User created successfully',
                user: {
                    name: newUser.name,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin || false,
                }
                })
            }
        } catch (error) {
            console.error("Ошибка в /registration:", error);
        }
    });

    app.post('/verify', async (req, res) => {
        const { email, code } = req.body;

        try {
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
    });

    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;

            if(email === 'admin' && password === 'admin') {
                return res.status(200).json({
                    message: 'You logined as admin',
                    user: {
                        email: 'admin',
                        isAdmin: true,
                    }
                });
            }

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            if(user.password !== password) {
                return res.status(400).json({ message: 'Пароль некорректный' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch) {
                return res.status(400).json({ message: 'Пароль некорректный'})
            }

            return res.status(200).json({
                message: 'Успешный вход',
                user: {
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin || false,
                },
            });

        } catch (error) {
            console.error('Ошибка при входе:', error);
            res.status(500).json({ message: 'Внутренняя ошибка сервера' });
        }
    });


    app.post('/resend-code', async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const newCode = Math.floor(100000 + Math.random() * 900000).toString();

            user.verificationCode = newCode;
            await user.save();

            await transporter.sendMail({
                from: `"DemoForma" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Повторный код подтверждения',
                text: `Ваш новый код подтверждения: ${newCode}`,
            });

            res.status(200).json({ message: 'Код повторно отправлен на почту' });

        } catch (error) {
            console.error('Ошибка повторной отправки кода:', error);
            res.status(500).json({ message: 'Ошибка сервера при повторной отправке' });
        }
    });

    app.post('/admin/verified-users',  async (req, res) => {

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

    })

    app.post('/admin/unverified-users',  async (req, res) => {
        try {
            const users = await User.find({ isVerified: false });

            res.status(200).json({
                message: "Список юзеров без верефикации",
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

    })

    app.post('/answers', async(req, res) => {
        try {
            const logs = req.body;
            await AnswerLog.insertMany(logs);
            res.status(200).json({message: "Answers saved"});
        } catch (err) {
            res.status(500).json({ message: 'Error on server' });
        }
    })


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });