const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getAllRewards = async () => {
    try {
        const result = await sql.query('SELECT * FROM MsReward');
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getRewardByRewardID = async (rewardID) => {
    try {
        const result = await sql.query(`SELECT * FROM MsReward WHERE RewardID = '${rewardID}'`);
        return result.recordset[0];
    }catch(err){
        throw { status: 500, message: err };
    }
};

module.exports = {getAllRewards, getRewardByRewardID};
