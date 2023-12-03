const express = require('express');
const adminController = require('./../Controllers/adminController');

const router = express.Router();

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.post('/update-password', adminController.updatePassword);

module.exports = router;