const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getAllDailyMission = async () => {
    try {
        const result = await sql.query('SELECT MissionID, ItemAmount, CategoryName FROM MsDailyMission JOIN MsCategory ON MsDailyMission.CategoryID = MsCategory.CategoryID');
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getDailyMissionProgress = async (studentID) => {
    try {
        const result = await sql.query(`SELECT * FROM MsMissionProgress WHERE StudentID = '${studentID}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

module.exports = {getAllDailyMission, getDailyMissionProgress};
