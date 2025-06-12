const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const answerRoutes = require('./routes/answersRoutes');

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
    try {
        const hash = await bcrypt.hash('SW|hG#W)xo>A4SV}R', 10);
        console.log(hash);
    } catch (err) {
        console.error('Hash error:', err);
    }
})();

console.log("MONGO_URI из .env:", process.env.DB_CONNECTION);

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.log('Error connecting to MongoDB', err.message);
        process.exit(1);
    });

app.use('/api/Admin', adminRoutes);
app.use('/api', authRoutes);
app.use('/api', answerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
