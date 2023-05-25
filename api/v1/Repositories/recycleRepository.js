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

      const insertTrStudentRecycleHistory = await sql.query(`
      INSERT INTO TrStudentRecycleHistory 
      (StudentID, StationID, CategoryID, AdminID, ItemWeight, PointsObtained, MissionID) 
      VALUES 
      ('${data.studentID}', '${data.stationID}', '${data.categoryID}', '${data.adminID}', '${data.itemWeight}', '${data.ecoCoins}', ${missionID})`);

      const insertMsStudent = await sql.query(`UPDATE MsStudent SET StudentPoints = StudentPoints + ${data.ecoCoins} WHERE StudentID = '${data.studentID}'`);

      return insertTrStudentRecycleHistory.recordset, insertMsStudent.recordset;
    } catch (err) {
      throw { status: 500, message: err };
    }
  };

module.exports = {getSpecificRecycleHistory, getSpecificCategoryRecycleHistory, insertStudentRecycleHistory};
