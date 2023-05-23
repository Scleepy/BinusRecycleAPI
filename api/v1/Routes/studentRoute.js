const express = require('express');
const studentController = require('./../Controllers/studentController');

const router = express.Router();

router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);
router.post('/specific', studentController.getStudent);

module.exports = router;