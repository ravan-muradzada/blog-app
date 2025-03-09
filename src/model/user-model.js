const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email!');
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minLength: 5
    },
    passwordChangedAt: {
        type: Date,
        default: null
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        trim: true,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
    posts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Post'
        }
    ]
})

userSchema.methods.generateToken = function() {
    const user = this;

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ _id: user._id.toString() }, secretKey, { expiresIn: '1d' });
    user.passwordChangedAt = new Date()
    return token;
}

userSchema.methods.toJSON = function() {
    const user = this.toObject();

    delete user.password;

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;