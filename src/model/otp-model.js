const mongoose = require('mongoose');
const mailSender = require('../utils/mail-sender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
});

otpSchema.pre("save", async function(next) {
    if (this.isNew) {
        await mailSender(this.email, 'One Time Password', 
            `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${this.otp}</p>`
        );
    }
    
    next();
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;