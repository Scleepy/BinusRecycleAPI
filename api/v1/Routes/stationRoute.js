const express = require('express');
const stationController = require('./../Controllers/stationController');

const router = express.Router();

router.get('/:stationID', stationController.getSpecificStation);

module.exports = router;