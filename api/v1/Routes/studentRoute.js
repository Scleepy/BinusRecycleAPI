const express = require('express');
const studentController = require('./../Controllers/studentController');

const router = express.Router();

router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);
router.get('/:studentID', studentController.getSpecificStudent);

module.exports = router;