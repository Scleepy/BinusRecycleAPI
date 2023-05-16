const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const existStudentID = async (studentID) => {
    try {
        const result = await sql.query(`SELECT * FROM MsStudent WHERE StudentID = '${studentID}'`);
        if (result.recordset.length === 0) return false;
        return true;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const existEmail = async (studentEmail) => {
    try {
        const result = await sql.query(`SELECT * FROM MsStudent WHERE StudentEmail = '${studentEmail}'`);
        if (result.recordset.length === 0) return false;
        return true;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const registerStudent = async (newStudent) => {
    try {
        const result = await sql.query(`INSERT INTO MsStudent(StudentID, StudentName, StudentEmail, StudentPassword, PasswordSalt) 
        VALUES('${newStudent.StudentID}', '${newStudent.StudentName}', '${newStudent.StudentEmail}', '${newStudent.StudentPassword}', '${newStudent.PasswordSalt}')`);
        
        const insertMissionPlaceholder = await sql.query(`INSERT INTO MsMissionProgress(StudentID, MissionID)
        VALUES('${newStudent.StudentID}', 'MS001'), ('${newStudent.StudentID}', 'MS002'), ('${newStudent.StudentID}', 'MS003')`);

        return result;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getStudentByEmail = async (email) => {
    try {
        const result = await sql.query(`SELECT * FROM MsStudent WHERE StudentEmail = '${email}'`);
        return result.recordset[0];
    }catch(err){
        throw { status: 500, message: err };
    }
};

const loginStudent = async (email, password) => {
    try {
        const result = await sql.query(`SELECT * FROM MsStudent WHERE StudentEmail = '${email}' AND AdminPassword = '${password}'`);
        return result;
    }catch(err){
        throw { status: 500, message: err };
    }
};

module.exports = {existStudentID, existEmail, registerStudent, loginStudent, getStudentByEmail};