const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getSpecificRecycleHistory = async (studentID) => {
    try {
        const result = await sql.query(`SELECT * FROM TrStudentRecycleHistory WHERE StudentID = '${studentID}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getSpecificRecycleHistoryByAdmin = async (adminID) => {
    try {
        const result = await sql.query(`SELECT RecyclingID, StudentName, A.StudentID, RecyclingDate, CategoryName, ItemWeight, PointsObtained FROM TrStudentRecycleHistory A JOIN MsStudent B ON A.StudentID = B.StudentID JOIN MsCategory C ON A.CategoryID = C.CategoryID WHERE AdminID = '${adminID}' ORDER BY RecyclingDate DESC`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getSpecificCategoryRecycleHistory = async (data) => {
    try {
        const result = await sql.query(`SELECT * FROM TrStudentRecycleHistory WHERE StudentID = '${data.studentID}' AND CategoryID = '${data.categoryID}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const insertStudentRecycleHistory = async (data) => {

    try {
      const missionID = data.missionID ? `'${data.missionID}'` : 'NULL';

      await sql.query(`INSERT INTO TrStudentRecycleHistory 
      (StudentID, StationID, CategoryID, AdminID, ItemWeight, PointsObtained, MissionID) 
      VALUES 
      ('${data.studentID}', '${data.stationID}', '${data.categoryID}', '${data.adminID}', '${data.itemWeight}', '${data.ecoCoins}', ${missionID})`);

      await sql.query(`UPDATE MsStudent SET StudentPoints = StudentPoints + ${data.ecoCoins} WHERE StudentID = '${data.studentID}'`);

    } catch (err) {
      throw { status: 500, message: err };
    }
  };

module.exports = {getSpecificRecycleHistory, getSpecificCategoryRecycleHistory, insertStudentRecycleHistory, getSpecificRecycleHistoryByAdmin};
