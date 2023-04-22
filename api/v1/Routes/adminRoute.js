const express = require('express');
const adminController = require('./../Controllers/adminController');

const router = express.Router();


router.post('/register', adminController.registerAdmin);

module.exports = router;