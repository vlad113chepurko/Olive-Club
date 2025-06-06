import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';

const hash = await bcrypt.hash('SW|hG#W)xo>A4SV}R', 10)
console.log(hash);

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import answerRoutes from './routes/answersRoutes.js';

dotenv.config();
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

console.log("MONGO_URI из .env:", process.env.DB_CONNECTION);

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.log('Error connecting to MongoDB', err.message);
        process.exit(1);
    });

app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', answerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
