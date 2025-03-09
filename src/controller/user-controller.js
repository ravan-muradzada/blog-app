const User = require('../model/user-model');
const { deleteImage } = require('../utils/post-related-functions');
const bcrypt = require('bcrypt');

exports.getMyProfile = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            success: true,
            profile: {
                user
            }
        });
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
}

exports.updateMyProfile = async (req, res) => {
    try {
        const user = req.user;

        const { name, email, password, bio } = req.body;
        const profilePicture = (req.file)? req.file.path: undefined;

        if (name) user.name = name;
        if (email) user.email = email;
        if (bio) user.bio = bio;

        if (profilePicture) {
            deleteImage(user);

            user.profilePicture = profilePicture;
        }
        
        if (password) {
            user.password = await bcrypt.hash(password, 8);
            user.passwordChangedAt = new Date();
        }

        await user.save();
        res.status(200).json({
            success: true,
            message: 'Updated successfully!'
        });
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
}