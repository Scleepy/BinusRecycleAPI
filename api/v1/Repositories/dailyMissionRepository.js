const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getAllDailyMission = async () => {
    try {
        const result = await sql.query('SELECT MissionID, ItemWeight, MsDailyMission.CategoryID, CategoryName FROM MsDailyMission JOIN MsCategory ON MsDailyMission.CategoryID = MsCategory.CategoryID');
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getSpecificDailyMission = async (categoryID) => {
    try {
        const result = await sql.query(`SELECT * FROM MsDailyMission WHERE CategoryID = '${categoryID}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getDailyMissionProgress = async (studentID) => {
    try {
        const currentDay = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const nextDay = new Date(Date.now() + 86400000).toISOString().split('T')[0].replace(/-/g, '');

        const result = await sql.query(`SELECT * FROM TrStudentRecycleHistory WHERE StudentID = '${studentID}' AND RecyclingDate >= '${currentDay}' AND RecyclingDate < '${nextDay}' AND MissionID IS NOT NULL`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getCompletedDailyMission = async (studentID) => {
    try {
        const currentDay = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const nextDay = new Date(Date.now() + 86400000).toISOString().split('T')[0].replace(/-/g, '');
        
        const result = await sql.query(`SELECT * FROM TrDailyMissionCompletion WHERE StudentID = '${studentID}' AND CompletionDate >= '${currentDay}' AND CompletionDate < '${nextDay}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getDailyMissionHistory = async (studentID) => {
    try {
        const result = await sql.query(`SELECT * FROM TrDailyMissionCompletion WHERE StudentID = '${studentID}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getDailyMissionCompletionFilterByCategoryID = async (studentID, categoryID) => {
    try {
        const result = await sql.query(`SELECT * FROM TrDailyMissionCompletion A JOIN MsDailyMission B ON A.MissionID = B.MissionID WHERE StudentID = '${studentID}' AND CategoryID = '${categoryID}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const insertDailyMissionCompletion = async (data) => {
    try {
        const result = await sql.query(`INSERT INTO TrDailyMissionCompletion (StudentID, MissionID, PointsEarned) VALUES ('${data.studentID}', '${data.missionID}', '5')`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
}

module.exports = {getAllDailyMission, getDailyMissionProgress, getDailyMissionHistory, getCompletedDailyMission, getDailyMissionCompletionFilterByCategoryID, getSpecificDailyMission, insertDailyMissionCompletion};
