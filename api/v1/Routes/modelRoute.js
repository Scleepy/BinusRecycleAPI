const express = require('express');
const multer = require('multer');
const modelController = require('../Controllers/modelControllers');

const router = express.Router();
const upload = multer();

router.post('/', upload.single('image'), modelController.predict);

module.exports = router;