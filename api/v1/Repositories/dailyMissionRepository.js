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

const getSpecificDailyMissionProgress = async (studentID) => {
    try {
        const currentDateTime = new Date();
        currentDateTime.setHours(currentDateTime.getHours() + 7); 
        
        const currentDay = currentDateTime.toISOString().split('T')[0].replace(/-/g, '');
        
        const nextDayDateTime = new Date(currentDateTime);
        nextDayDateTime.setDate(nextDayDateTime.getDate() + 1);
        
        const nextDay = nextDayDateTime.toISOString().split('T')[0].replace(/-/g, '');
        
        const result = await sql.query(`SELECT * FROM TrStudentRecycleHistory WHERE StudentID = '${studentID}' AND RecyclingDate >= '${currentDay}' AND RecyclingDate < '${nextDay}' AND MissionID IS NOT NULL`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getSpecificCompletedDailyMission = async (studentID) => {
    try {
        const currentDateTime = new Date();
        currentDateTime.setHours(currentDateTime.getHours() + 7); 
        
        const currentDay = currentDateTime.toISOString().split('T')[0].replace(/-/g, '');
        
        const nextDayDateTime = new Date(currentDateTime);
        nextDayDateTime.setDate(nextDayDateTime.getDate() + 1);
        
        const nextDay = nextDayDateTime.toISOString().split('T')[0].replace(/-/g, '');

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
        const currentDateTime = new Date();
        currentDateTime.setHours(currentDateTime.getHours() + 7); 
        
        const currentDay = currentDateTime.toISOString().split('T')[0].replace(/-/g, '');
        
        const nextDayDateTime = new Date(currentDateTime);
        nextDayDateTime.setDate(nextDayDateTime.getDate() + 1);
        
        const nextDay = nextDayDateTime.toISOString().split('T')[0].replace(/-/g, '');

        const result = await sql.query(`SELECT * FROM TrDailyMissionCompletion A JOIN MsDailyMission B ON A.MissionID = B.MissionID WHERE StudentID = '${studentID}' AND CategoryID = '${categoryID}' AND CompletionDate >= '${currentDay}' AND CompletionDate < '${nextDay}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const insertDailyMissionCompletion = async (data) => {
    try {
        await sql.query(`INSERT INTO TrDailyMissionCompletion (StudentID, MissionID, PointsEarned) VALUES ('${data.studentID}', '${data.missionID}', '5')`);
        await sql.query(`UPDATE MsStudent SET StudentPoints = StudentPoints + 5 WHERE StudentID = '${data.studentID}'`);
    }catch(err){
        throw { status: 500, message: err };
    }
}

const resetDailyMission = async () => {
    try {
        await sql.query('EXEC spGenerateDailyMissions');
        await sql.query(`DELETE FROM TrDailyMissionCompletion WHERE StudentID = '2501975261' AND CompletionDate >= '20231125' AND CompletionDate < '20231126'`);
        await sql.query(`DELETE FROM TrStudentRecycleHistory WHERE StudentID = '2501975261' AND RecyclingDate >= '20231125' AND RecyclingDate < '20231126'`);
    }catch(err){
        throw { status: 500, message: err };
    }
};

module.exports = {getAllDailyMission, getSpecificDailyMissionProgress, getDailyMissionHistory, getSpecificCompletedDailyMission, getDailyMissionCompletionFilterByCategoryID, getSpecificDailyMission, insertDailyMissionCompletion, resetDailyMission};
