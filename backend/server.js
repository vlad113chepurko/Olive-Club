const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');


dotenv.config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const answerRoutes = require('./routes/answersRoutes');

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.log('Error connecting to MongoDB', err.message);
        process.exit(1);
    });

app.use('/api/admin', adminRoutes);
app.use('/api', authRoutes);
app.use('/api', answerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
