require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Connection error',err.message));

app.get('/', (req,res) => {
    res.send('Student Portal API is running....');
});

app.use('/api/students', require('./routes/student'));
app.use('/api/auth', require('./routes/auth'));
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});