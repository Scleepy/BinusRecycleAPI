const express = require('express');
require('dotenv').config();
const sql = require('./databaseConnection');

const getSpecificStation = async (stationID) => {
    try {
        const result = await sql.query(`SELECT StationID, StationLocation, BuildingName FROM MsRecycleStation JOIN MsBuilding ON MsRecycleStation.BuildingID = MsBuilding.BuildingID WHERE StationID = '${stationID}'`);
        return result.recordset[0];
    }catch(err){
        throw { status: 500, message: err };
    }
};

const getAllStationAndInformation = async () => {
    try {
        const result = await sql.query('SELECT A.StationID, B.BuildingID, B.BuildingName, A.StationLocation, C.CategoryID, D.CategoryName FROM MsRecycleStation A JOIN MsBuilding B ON A.BuildingID = B.BuildingID JOIN MsRecycleStationCategory C ON A.StationID = C.StationID JOIN MsCategory D ON C.CategoryID = D.CategoryID');
        return result.recordset;
    }catch(err){
        throw { status: 500, message: err };
    }
}

module.exports = {getSpecificStation, getAllStationAndInformation};
