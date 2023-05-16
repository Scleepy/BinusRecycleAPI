const express = require('express');
const purchaseController = require('./../Controllers/purchaseController');

const router = express.Router();

router.post('/history', purchaseController.getPurchaseHistory);

module.exports = router;