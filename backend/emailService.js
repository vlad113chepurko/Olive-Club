import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const emailService = async(email, code) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        }
    })

    const mailOptions = {
        from: `"Olives trees" <info@eco-olive-trees.com>`,
        to: email,
        subject: 'Подтверждение регистрации',
        text: `Ваш код подтверждения: ${code}`,
        html: `<p>Ваш код подтверждения: ${code}</p>`,
    }

    await transporter.sendMail(mailOptions);
}