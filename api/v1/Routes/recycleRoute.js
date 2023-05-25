const express = require('express');
const recycleController = require('./../Controllers/recycleController');

const router = express.Router();

router.get('/history/:studentID', recycleController.getSpecificRecycleHistory);
router.get('/history/:studentID/:categoryID', recycleController.getSpecificCategoryRecycleHistory);
router.post('/', recycleController.studentRecycle);

module.exports = router;