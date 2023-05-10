const express = require('express');
const dailyQuestController = require('./../Controllers/dailyQuestController');

const router = express.Router();

router.get('/', dailyQuestController.getAllDailyQuest);

module.exports = router;