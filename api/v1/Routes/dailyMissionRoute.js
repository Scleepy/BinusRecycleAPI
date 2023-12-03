const express = require('express');
const dailyMissionController = require('./../Controllers/dailyMissionController');

const router = express.Router();

router.get('/', dailyMissionController.getAllDailyMission);
router.get('/progress/:studentID', dailyMissionController.getSpecificDailyMissionProgress);
router.get('/history/:studentID', dailyMissionController.getSpecificDailyMissionHistory);
router.get('/reset-daily', dailyMissionController.resetDailyMission);

module.exports = router;