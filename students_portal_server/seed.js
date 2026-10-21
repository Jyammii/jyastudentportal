require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const hashed = await bcrypt.hash('admin123', 10);

   await User.create({
        name: 'Admin User',
        email: 'admin@portal.com',
        password: hashed,
        role: 'admin'
    });

    console.log('Admin user created : admin@portal.com / admin123');
    process.exit();
});
