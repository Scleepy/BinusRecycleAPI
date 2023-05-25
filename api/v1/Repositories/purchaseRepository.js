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

module.exports = {getSpecificPurchaseHistory};
