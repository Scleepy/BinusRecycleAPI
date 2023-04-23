const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getSpecificStation = async (stationID) => {
    try {
        const result = await sql.query(`SELECT * FROM MsRecycleStation JOIN MsBuilding ON MsRecycleStation.BuildingID = MsBuilding.BuildingID WHERE StationID = '${stationID}'`);
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
};

module.exports = {getSpecificStation};
