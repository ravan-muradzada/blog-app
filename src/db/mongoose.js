const mongoose = require('mongoose');

const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blog-app';
 
mongoose.connect(url)
    .then(() => console.log('db connected successfully!'))
    .catch(() => console.log('smth wrong while connecting to db!'));