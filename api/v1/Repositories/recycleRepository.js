const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getAllRecycleHistory = async (studentID) => {
    try {
        const result = await sql.query(`SELECT * FROM TrStudentRecycleHistory WHERE StudentID = '${studentID}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getSpecificRecycleHistory = async (data) => {
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

      const result = await sql.query(`
      INSERT INTO TrStudentRecycleHistory 
      (StudentID, StationID, CategoryID, ItemWeight, PointsObtained, MissionID) 
      VALUES 
      ('${data.studentID}', '${data.stationID}', '${data.categoryID}', '${data.itemWeight}', '${data.ecoCoins}', ${missionID})`);

      return result;
    } catch (err) {
      throw { status: 500, message: err };
    }
  };

module.exports = {getAllRecycleHistory, getSpecificRecycleHistory, insertStudentRecycleHistory};
