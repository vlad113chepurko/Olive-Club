import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const emailService = async(email, code) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: `"DemoForma" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Подтверждение регистрации',
        text: `Ваш код подтверждения: ${code}`,
        html: `<p>Ваш код подтверждения: ${code}</p>`,
    }

    await transporter.sendMail(mailOptions);
}