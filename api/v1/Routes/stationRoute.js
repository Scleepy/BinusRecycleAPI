const express = require('express');
const stationController = require('./../Controllers/stationController');

const router = express.Router();

router.get('/:stationID', stationController.getSpecificStation);
router.get('/', stationController.getAllStationAndInformation);

module.exports = router;