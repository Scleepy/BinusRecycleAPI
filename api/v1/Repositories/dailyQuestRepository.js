const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getAllDailyQuest = async () => {
    try {
        const result = await sql.query('SELECT * FROM MsDailyQuest');
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

module.exports = {getAllDailyQuest};
