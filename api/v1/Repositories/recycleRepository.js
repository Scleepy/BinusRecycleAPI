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

module.exports = {getAllRecycleHistory, getSpecificRecycleHistory};
