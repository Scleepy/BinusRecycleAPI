const express = require('express');
const recycleController = require('./../Controllers/recycleController');

const router = express.Router();

router.post('/history', recycleController.getAllRecycleHistory);
router.post('/history/specific', recycleController.getSpecificRecycleHistory);

module.exports = router;