const User = require('../model/user-model');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split('Bearer ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Token expired or not found!'
            });
        }
        const secretKey = process.env.SECRET_KEY;
        const upload = jwt.verify(token, secretKey);

        req.user = await User.findById(upload._id);

        if (!req.user) {
            return res.status(404).json({
                success: false,
                error: 'User not found!'
            });
        }
    
        
        if (req.user.passwordChangedAt && req.user.passwordChangedAt.getTime()/1000 > upload.iat) {
            return res.status(401).json({
                success: false,
                message: 'Password changed! Please, log in again!'
            });
        }

        next();
    } catch(e) {
        res.status(400).json({
            success: false,
            error: e.message
        });
    }
}

module.exports = auth;