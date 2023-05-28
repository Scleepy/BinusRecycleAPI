const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getLatestID = async () => {
    try {
        const result = await sql.query('SELECT TOP 1 AdminID FROM MsAdmin ORDER BY AdminID DESC');
         if (result.recordset.length === 0) return 'AD000';
        return result.recordset[0].AdminID;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const existEmail = async (adminEmail) => {
    try {
        const result = await sql.query(`SELECT * FROM MsAdmin WHERE AdminEmail = '${adminEmail}'`);
        if (result.recordset.length === 0) return false;
        return true;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const registerAdmin = async (admin) => {
    try {
        await sql.query(`INSERT INTO MsAdmin VALUES('${admin.AdminID}', '${admin.AdminName}', '${admin.AdminEmail}', '${admin.AdminPassword}', '${admin.PasswordSalt}', '${admin.StationID}')`);
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getAdminByEmail = async (email) => {
    try {
        const result = await sql.query(`SELECT AdminID, AdminName, AdminEmail, AdminPassword, PasswordSalt, A.StationID, B.BuildingID, StationLocation, BuildingName FROM MsAdmin A JOIN MsRecycleStation B ON A.StationID = B.StationID JOIN MsBuilding C ON B.BuildingID = C.BuildingID WHERE AdminEmail = '${email}'`);
        return result.recordset[0];
    }catch(err){
        throw { status: 500, message: err };
    }
};

const loginAdmin = async (email, password) => {
    try {
        const result = await sql.query(`SELECT * FROM MsAdmin WHERE AdminEmail = '${email}' AND AdminPassword = '${password}'`);
        return result;
    }catch(err){
        throw { status: 500, message: err };
    }
};

module.exports = {getLatestID, existEmail, registerAdmin, loginAdmin, getAdminByEmail};
