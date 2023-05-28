const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getSpecificPurchaseHistory = async (studentID) => {
    try {
        const result = await sql.query(`SELECT * FROM TrRewardPurchase WHERE StudentID = '${studentID}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const rewardPurchase = async (purchaseData) => {
    try {
        await sql.query(`INSERT INTO TrRewardPurchase(StudentID, RewardID, PurchaseAmount) VALUES ('${purchaseData.studentID}', '${purchaseData.rewardID}', ${purchaseData.purchaseAmount})`);
        await sql.query(`UPDATE MsStudent SET StudentPoints = StudentPoints - ${purchaseData.ecoCoins} WHERE StudentID = '${purchaseData.studentID}'`);
    }catch(err){
        throw { status: 500, message: err };
    }
};

module.exports = {getSpecificPurchaseHistory, rewardPurchase};
