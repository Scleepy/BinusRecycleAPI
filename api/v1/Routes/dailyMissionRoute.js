const express = require('express');
const dailyMissionController = require('./../Controllers/dailyMissionController');

const router = express.Router();

router.get('/', dailyMissionController.getAllDailyMission);
router.post('/progress', dailyMissionController.getDailyMissionProgress);
router.post('/history', dailyMissionController.getDailyMissionHistory);

module.exports = router;