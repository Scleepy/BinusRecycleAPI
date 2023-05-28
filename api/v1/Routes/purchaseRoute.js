const express = require('express');
const purchaseController = require('./../Controllers/purchaseController');

const router = express.Router();

router.get('/history/:studentID', purchaseController.getSpecificPurchaseHistory);
router.post('/', purchaseController.rewardPurchase);

module.exports = router;