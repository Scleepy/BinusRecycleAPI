const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getAllCategories = async () => {
    try {
        const result = await sql.query('SELECT * FROM MsCategory');
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getCategoryByID = async (categoryID) => {
    try {
        const result = await sql.query(`SELECT * FROM MsCategory WHERE CategoryID = '${categoryID}'`);
        return result.recordset[0];
    }catch(err){
        throw { status: 500, message: err };
    }
}

module.exports = {getAllCategories, getCategoryByID};
