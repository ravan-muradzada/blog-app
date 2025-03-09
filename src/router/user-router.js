const express = require('express');
const router = new express.Router();

const userController = require('../controller/user-controller');
const auth = require('../middleware/auth');
const profilePhotoUpload = require('../utils/profile-photo-multer');

router.get('/api/user/get-my-profile', auth, userController.getMyProfile);

router.patch('/api/user/update-my-profile', profilePhotoUpload.single('profile-picture'), auth, userController.updateMyProfile);

module.exports = router;