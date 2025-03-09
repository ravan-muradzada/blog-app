const express = require('express');
const app = express();
const router = new express.Router();
const authController = require('../controller/auth-controller');
const profilePhotoUpload = require('../utils/profile-photo-multer');

const checkEmailExistenceInSession = require('../middleware/email-checker');
const auth = require('../middleware/auth');

// Entering credentials
router.post('/api/auth/register', authController.register);

// Verifying the otp code
router.post('/api/auth/verify-otp', checkEmailExistenceInSession, authController.verifyOTP);

// Entering other credentials like profile picture and bio
router.post('/api/auth/sign-up-more-credentials', profilePhotoUpload.single('profile-picture'), auth, authController.otherCredentials);

router.post('/api/auth/login', authController.login);

router.post('/api/auth/logout', auth, authController.logout);

router.delete('/api/auth/delete-my-account', auth, authController.deleteAccount);

module.exports = router;
