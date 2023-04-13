const express = require('express');
const categoryController = require('./../Controllers/categoryController');

const router = express.Router();

router.get('/', categoryController.getAllCategories);

module.exports = router;