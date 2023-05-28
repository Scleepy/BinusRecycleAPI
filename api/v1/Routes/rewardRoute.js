const express = require('express');
const rewardController = require('./../Controllers/rewardController');

const router = express.Router();

router.get('/', rewardController.getAllRewards);

module.exports = router;