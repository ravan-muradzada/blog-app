const validator = require('validator');
const User = require('../model/user-model');
const Post = require('../model/post-model');
const OTP = require('../model/otp-model');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const { deleteImage, deleteImages } = require('../utils/post-related-functions');
 
exports.register = async (req, res) => {
    try { 
        const { name, email, password } = req.body;

        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ 
                success: false,
                error: 'No email or wrong email format!' 
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                error: 'Password required!'
            });
        }

        const checkEmailExistence = await User.findOne({ email });

        if (checkEmailExistence) {
            return res.status(400).json({ 
                success: false, 
                error: 'This email was already taken!' 
            });
        }


        req.session.name = name; // stuck in this line
        req.session.email = email;
        req.session.password = await bcrypt.hash(password, 8);

        let currentOtp, checkOtpExistence;

        do {
            currentOtp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            checkOtpExistence = await OTP.findOne({ otp: currentOtp});
        }while(checkOtpExistence);

        await OTP.create({ email, otp: currentOtp });

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            currentOtp, // Temporary
            redirect: '/verify-otp'
        });
    } catch(e) {
        console.log('here')
        res.status(400).json({ error: e.message });
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        // Verify otp
        const { otp } = req.body;
        const email = req.session.email;

        const checkOTPExistence = await OTP.findOne({ email, otp });

        if (!checkOTPExistence) {
            return res.status(400).json({
                success: false,
                error: 'Wrong otp!'
            });
        }

        // Sing up
        const password = req.session.password;
        const name = req.session.name;

        const user = new User({ name, email, password });
        await user.save();

        

        const token = user.generateToken();
        await req.session.destroy();

        res.status(201).send({
            success: true,
            message: 'Otp verified successfully and created a new user!',
            redirect: '/sign-up-more-credentials',
            token
        });
    } catch(e) {
        res.status(400).json({ 
            success: false,
            error: e.message
        });
    }
}

exports.otherCredentials = async (req, res) => {
    try {
        const { bio } = req.body;
        const profilePhotoPath  = req.file.path;
        const user = req.user;

        user.profilePicture = profilePhotoPath.toString();

        user.bio = bio;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile created successfully!'
        });
    } catch(e) {
        res.status(400).json({
            success: false,
            error: e.message
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User with these credentials not found!'
            });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return res.status(403).json({
                success: false,
                error: 'Email or password entered wrong!'
            });
        }
 
        const token = user.generateToken();

        res.status(200).json({
            success: true,
            message: 'Successful login',
            token
        });
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
}

exports.logout = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Successfully logged out!'
        });
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
}

exports.deleteAccount = async (req, res) => {
    try {

        for (const postId of req.user.posts) {
            const post = await Post.findById(postId);
            deleteImages(post);
            await post.deleteOne();
        }
        
        deleteImage(req.user);
        await req.user.deleteOne();



        res.status(200).json({
            success: true,
            message: 'Successfully deleted!'
        });
    } catch(e) {
        res.status(400).json({
            success: false,
            error: e.message
        })
    }
}