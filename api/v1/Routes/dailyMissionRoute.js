const express = require('express');
const dailyMissionController = require('./../Controllers/dailyMissionController');

const router = express.Router();

router.get('/', dailyMissionController.getAllDailyMission);
router.post('/progress', dailyMissionController.getDailyMissionProgress);

module.exports = router;